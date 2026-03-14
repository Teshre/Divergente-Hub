# 🏛️ Propuesta de Arquitectura: Divergente Hub (V2.5 - Antigravity)

**Versión:** 2.5 (Execution Hardened)  
**Fecha:** 2026-03-11  
**Autor:** Antigravity (Arquitecto Jefe)  
**Tipo:** Propuesta Oficial — Auditada y Aprobada  
**Estado:** Lista para Ejecución

---

## 📋 Resumen Ejecutivo

Divergente Hub es un **Monolito Modular Robusto (Modular Monolith)** que unifica las aplicaciones del ecosistema Divergente bajo una sola experiencia de usuario. La versión 2.5 incorpora los hallazgos de **4 rondas de auditoría técnica** y una verificación cruzada contra el código fuente real de ALPRO, endureciendo el plan de ejecución para evitar sorpresas en la migración.

**Filosofía:** "Ecosistema Unificado en la UI, Completamente Aislado en la Memoria y Dependencias."

---

## 1. 🎯 Decisiones Tecnológicas Bloqueantes

| Tecnología | Rol | Justificación |
|------------|-----|---------------|
| **Vite + React 19** | Motor Principal | Alineado con ALPRO actual. Sin downgrades. |
| **Zustand (Core)** | Estado Global | Solo `Auth`, `PBAC`, `UI Theme`. Los stores de ALPRO (10 slices) permanecen locales en su módulo. |
| **TanStack Query** | Server State | *SWR* para normales, *Invalidate-on-Realtime* para Live. |
| **`useSupabaseQuery`** | Multi-tenant | Hook centralizado que inyecta `organization_id` en Selects, Payloads de Mutaciones y RPCs. Acepta un `GlobalContext` extensible (`{ organizationId, branchId?, locationId? }`) para futuro multi-sucursal. |
| **Estructura Plana** | Aislamiento | Un solo `package.json`. *Nota:* `tsc` falla global; las barreras se fuerzan vía **ESLint** (`no-restricted-imports`). |

---

## 2. 🏗️ Arquitectura de los Tres Pilares y Ownership

### Pilar A: Core & Pilar B: Shared (The Platform/Shell)
**Dueño:** Platform/Core Owner (Tú)
- **Core:** Sesión JWT, Motor PBAC, Guards de Navegación, Selector de Organización, Providers (`QueryClientProvider`, `ErrorBoundary`).
- **Shared:** MVP UI Kit (`shared/ui`), Hooks de Fetching (`useSupabaseQuery`, `useRealtimeSubscription`), utilidades, CI/CD.

### Pilar C: Modules (Las Islas de Negocio)
**Dueños:** Module Owners (Perry: Forms/Taskmanager, Tú: ALPRO)
- **Regla Estricta:** Solo componentes de `shared/ui` y hooks de `shared/hooks`. No hay imports cruzados.
  - *Enforcement:* ESLint `no-restricted-imports` bloquea `@supabase/supabase-js` fuera de `shared/`.

### Política de "Module Exports" (Datos Agregados sin Imports Cruzados)
Para que el Dashboard del Hub muestre KPIs de ALPRO sin romper el aislamiento:
- **Contrato por datos, no por código:** El Dashboard consume agregados vía Supabase views/RPCs (`alpro_kpis`, `alpro_inventory_summary`) usando `useSupabaseQuery`. Nunca importa hooks internos de ALPRO.
- **Plugin Registry (solo UI):** Cada módulo puede exponer widgets visuales mediante un `register(registry)` desde su EntryPoint. El Core solo conoce el registry, no los internals del módulo.

---

## 3. 📂 Estructura de Carpetas

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
    │
    ├── alpro/               # TÚ: ALPRO ERP
    │   ├── AlproEntryPoint.tsx  # Proxy "wrap" inicial (Fase 7A)
    │   ├── api/             # TanStack Queries (nuevas)
    │   ├── stores/          # Zustand local (10 slices, coexisten)
    │   └── components/      # (Fase 7B: migrados desde raíz)
    │
    ├── forms/               # PERRY: Diver Forms
    │   ├── api/
    │   └── components/
    │
    └── taskmanager/         # PERRY: Task Manager
```

### 3.1 Edge Functions (Naming Convention)

**Formato:** `hub-<module>-<verbo>-<recurso>`  
**Ownership:** Platform Owner crea por defecto. Module Owner propone con revisión si toca seguridad.

| Ejemplo | Módulo |
|---------|--------|
| `hub-core-create-user` | Core |
| `hub-alpro-close-daily` | ALPRO |
| `hub-forms-submit-response` | Forms |

---

## 4. 🚀 Tácticas de Rendimiento y Resiliencia

### 4.1 Lazy Loading + PBAC Guard + ErrorBoundary (Triple Barrera)
Cada módulo lazy-loaded se envuelve en 3 capas de protección:

```typescript
// src/core/router/Router.tsx
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
*(Si Forms explota, el usuario ve "Módulo Forms tuvo un error" sin tumbar ALPRO ni el Core.)*

### 4.2 Multi-Tenant "By Design"
ESLint bloquea `supabase.from()` crudo fuera de `shared/`. El hook `useSupabaseQuery` inyecta `organization_id` desde un `GlobalContext` extensible que vive en `core/providers/`:
```typescript
type GlobalContext = {
  organizationId: string;
  branchId?: string;    // Futuro multi-sucursal
  locationId?: string;  // Futuro multi-ubicación
};
```

### 4.3 Patrón Realtime vs TanStack Query
- **Módulos "Standard" (Forms, Analytics):** *Stale-while-revalidate*.
- **Módulos "Live ERP" (KDS):** Hook `useRealtimeSubscription('tabla', queryKey)`. *Evolución:* inicia con `invalidateQueries`; evolucionará a **Patch de caché por delta** (`setQueryData`) para evitar parpadeos.

### 4.4 PWA por Etapas
- **Etapa 1:** Caché de App-Shell y assets.
- **Etapa 2:** Outbox/Queue para escrituras offline (Forms, KDS).

---

## 5. 🛡️ CI/CD y Testing

`.github/workflows/main.yml` bloquea merge si:
1. `npm run type-check` falla *globalmente* (un error en `forms` detiene `alpro`).
2. `npm run test:run` falla. **(Pragmático: Happy Paths críticos, no coverage global estricto.)**

**Cultura RTL:** PR#1 incluye un test ejemplo (`shared/ui/__tests__/Button.test.tsx`) como "Hello World" de React Testing Library para el equipo.

---

## 6. 🗺️ Plan de PRs (Execution Hardened — 2 Personas)

### Hito 1: Infraestructura Shell (Tú — Platform Owner)
- **PR 1:** Shell + Router + Guards + Providers.
  - Incluye: `QueryClientProvider`, `ModuleErrorBoundary`, stub `useCurrentOrg()`.
  - *Smoke Test:* `/alpro` y `/forms` retornan 403 sin login; `/` carga `CoreLoader`.
- **PR 2:** CI/CD Workflow (`type-check` + `vitest run`).
- **PR 3:** `shared/hooks`: `useSupabaseQuery(GlobalContext)` + `useRealtimeSubscription` + reglas ESLint `no-restricted-imports`.
- **PR 4:** `shared/ui` Top 5 componentes + 1 test RTL ejemplo.

### Hito 2: Skeletons de Módulos (Perry — Module Owner)
- **PR 5:** `modules/forms` skeleton (list + create) usando solo `useSupabaseQuery`.
- **PR 6:** `modules/taskmanager` skeleton (list + create + status).

### Hito 3: Migración ALPRO (Tú — Platform Owner, 2 Fases)
- **PR 7A (Wrap):** `modules/alpro/AlproEntryPoint.tsx` que monta ALPRO mediante proxy exports y tsconfig paths. **SIN mover las carpetas de la raíz todavía.** ALPRO sigue funcionando tal cual dentro del Hub.
- **PR 7B (Trasplante Real):** Mover físicamente `components/`, `hooks/`, `services/`, `utils/`, `types/`, `contexts/` a `src/modules/alpro/*` con **PRs pequeños por carpeta**. Eliminar proxys gradualmente.

---
*Propuesta de arquitectura V2.5 (Execution Hardened) — Resultado de 4 rondas de auditoría técnica.*
