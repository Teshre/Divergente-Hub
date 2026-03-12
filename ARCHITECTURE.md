# 🏛️ Arquitectura del Hub: Divergente Hub (Constitución)

> **Versión:** 2.5 (Execution Hardened)  
> **Tipo:** Documento Constitución — Obligatorio para TODOS los devs/agentes  
> **Última Auditoría:** 2026-03-12 (Score: 8.6/10 — Aprobado)

---

## 1. Visión General

**Divergente Hub** es un **Monolito Modular (Modular Monolith)** que unifica las aplicaciones del ecosistema Divergente bajo una sola experiencia de usuario.

**Filosofía:** "Ecosistema Unificado en la UI, Completamente Aislado en la Memoria y Dependencias."

> **Regla de Oro:** ALPRO nunca se rompe. Cada cambio mantiene la app funcional en todo momento.

---

## 2. Modelo de Documentación: Constitución + Estatutos

| Nivel | Qué documenta | Quién lo lee |
|-------|--------------|:------------:|
| **Constitución** (este doc + Hub PATTERN_INDEX + DESIGN_SYSTEM) | Reglas del juego: Core, Shared, PBAC, Multi-Tenant | Todos |
| **Estatutos** (`modules/*/ARCHITECTURE.md`) | Mundo interno de cada módulo | Solo el equipo del módulo |

Los Estatutos **referencian** a la Constitución, **nunca la duplican**.

---

## 3. Decisiones Tecnológicas

| Tecnología | Rol | Justificación |
|------------|-----|---------------|
| **Vite + React 19** | Motor Principal | Alineado con ALPRO |
| **Zustand (Core)** | Estado Global | Solo `Auth`, `PBAC`, `UI Theme`. Stores de módulos = locales |
| **TanStack Query** | Server State | SWR para normales, Invalidate-on-Realtime para Live |
| **`useSupabaseQuery`** | Multi-tenant | Hook centralizado con `GlobalContext` extensible |
| **Estructura Plana** | Aislamiento | Un solo `package.json`. Barreras vía **ESLint** |

---

## 4. Los Tres Pilares + Ownership

### Pilar A: Core (Platform Owner — Tú)
- Sesión JWT, Motor PBAC, Guards de Navegación, Selector de Organización
- Providers: `QueryClientProvider`, `ModuleErrorBoundary`

### Pilar B: Shared (Platform Owner — Tú)
- MVP UI Kit (`shared/ui`), Hooks de Fetching (`useSupabaseQuery`, `useRealtimeSubscription`)
- Utilidades, CI/CD, ESLint enforcement

### Pilar C: Modules (Module Owners)
- Perry: Forms, TaskManager
- Tú: ALPRO
- **Regla Estricta:** Solo `shared/ui` y `shared/hooks`. No imports cruzados.

### Política de Module Exports (Datos sin Imports Cruzados)
- Dashboard consume KPIs vía Supabase views/RPCs (`alpro_kpis`), nunca hooks internos.
- Plugin Registry opcional para widgets visuales vía `register(registry)` desde EntryPoint.

---

## 5. Estructura de Carpetas

```text
src/
├── main.tsx
├── App.tsx
│
├── core/                    # PLATFORM OWNER
│   ├── auth/                # Login + Supabase Session
│   ├── pbac/                # Guards de Navegación PBAC
│   ├── org/                 # Selector de Tenant + useCurrentOrg()
│   └── providers/           # QueryClientProvider, ModuleErrorBoundary
│
├── shared/                  # PLATFORM OWNER
│   ├── ui/                  # MVP UI Kit: Button, Card, Modal, Input, Table
│   │   └── __tests__/       # Test RTL ejemplo (Button.test.tsx)
│   ├── hooks/               # useSupabaseQuery, useRealtimeSubscription
│   └── types/               # Tipos Base
│
└── modules/                 # MODULE OWNERS (Islas Lazy-Loaded)
    ├── alpro/               # TÚ — Ver: modules/alpro/ARCHITECTURE.md
    ├── forms/               # PERRY — Ver: modules/forms/ARCHITECTURE.md
    └── taskmanager/         # PERRY — Ver: modules/taskmanager/ARCHITECTURE.md
```

### 5.1 Edge Functions (Naming Convention)
**Formato:** `hub-<module>-<verbo>-<recurso>`  
**Ownership:** Platform Owner crea por defecto. Module Owner propone con revisión.

---

## 6. Triple Barrera: Lazy Loading + PBAC + ErrorBoundary

```typescript
const AlproModule = lazy(() => import('@/modules/alpro/AlproEntryPoint'));

export const AppRouter = () => (
  <Routes>
    <Route path="/alpro/*" element={
      <RequirePermission permission={Permission.ALPRO_ACCESS}>   {/* 1. Guard */}
        <Suspense fallback={<CoreLoader message="Abriendo..." />}> {/* 2. Loading */}
          <ModuleErrorBoundary moduleName="ALPRO">                {/* 3. Error */}
            <AlproModule />
          </ModuleErrorBoundary>
        </Suspense>
      </RequirePermission>
    } />
  </Routes>
);
```

---

## 7. Multi-Tenant "By Design"

ESLint bloquea `supabase.from()` crudo fuera de `shared/`. El hook `useSupabaseQuery` inyecta `organization_id` desde un `GlobalContext` extensible:

```typescript
type GlobalContext = {
  organizationId: string;
  branchId?: string;    // Futuro multi-sucursal
  locationId?: string;  // Futuro multi-ubicación
};
```

---

## 8. PBAC: Cobertura Completa (Herencia de ALPRO v3.1)

El Hub **hereda todo** el modelo PBAC sin simplificar:
- Permisos granulares por array
- Permisos efectivos (fallback a rol)
- `checkAccess()` centralizado en `core/pbac/`
- Protección de cuenta maestra
- Multi-Tenant RLS como red de seguridad

**Adiciones Hub:** `ALPRO_ACCESS`, `FORMS_*`, `TASKMANAGER_*`, `RequirePermission` guard.

---

## 9. CI/CD y Testing

`.github/workflows/main.yml` bloquea merge si:
1. `npm run type-check` falla globalmente
2. `npm run test:run` falla (Happy Paths críticos, no coverage estricto)

PR#1 incluye test ejemplo RTL (`shared/ui/__tests__/Button.test.tsx`).

---

## 10. Plan de PRs

### Hito 1: Infraestructura Shell (Platform Owner)
- **PR#1:** Shell + Router + Guards + Providers + stub `useCurrentOrg()`
- **PR#2:** CI/CD Workflow
- **PR#3:** `shared/hooks` + ESLint rules
- **PR#4:** `shared/ui` Top 5 + test RTL

### Hito 2: Módulos (Module Owners)
- **PR#5:** `modules/forms` skeleton
- **PR#6:** `modules/taskmanager` skeleton

### Hito 3: Migración ALPRO (Platform Owner, 2 Fases)
- **PR#7A (Wrap):** Proxy exports, sin mover carpetas
- **PR#7B (Trasplante):** Mover carpetas físicamente, PRs pequeños por carpeta

---

## 📚 Documentos Relacionados

| Documento | Ubicación |
|-----------|-----------|
| PATTERN_INDEX (reglas cross-app) | `PATTERN_INDEX.md` (este repo) |
| DESIGN_SYSTEM (Emerald Stone) | `DESIGN_SYSTEM.md` (este repo) |
| Propuesta original V2.5 | `ARCHITECTURE_PROPOSAL_ANTIGRAVITY.md` |
| Backlog del Hub | `BACKLOG.md` |
| Estatuto ALPRO | `src/modules/alpro/ARCHITECTURE.md` |
| Estatuto Forms | `src/modules/forms/ARCHITECTURE.md` |

---
*Documento Constitución — Divergente Hub V2.5 — Aprobado 2026-03-12*
