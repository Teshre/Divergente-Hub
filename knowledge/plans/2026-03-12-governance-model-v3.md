# 🏛️ Hub V2.5 — Plan de Gobernanza, Documentación y Coordinación (V3 Final)

**Fecha:** 2026-03-12  
**Estado:** Propuesta final para aprobación  
**Modelo:** "Constitución + Estatutos" + Onboarding en Capas

---

## 1. Transformación ALPRO → Hub

ALPRO (producción) **no se mueve**. El Hub se construye alrededor.

| Paso | Qué pasa | ALPRO sigue? |
|------|----------|:------------:|
| 1. Shell del Hub | Router, Auth, Providers | ✅ Intacto |
| 2. Apps satélite | Perry integra Forms/TaskManager | ✅ Intacto |
| 3. ALPRO Wrap (PR#7A) | `AlproEntryPoint.tsx` proxy | ✅ Proxy |
| 4. Trasplante (PR#7B) | Mover carpetas gradualmente | ✅ Incremental |

> **Regla de Oro:** ALPRO nunca se rompe.

---

## 2. Modelo "Constitución + Estatutos"

### Principio
- **Constitución (Hub):** Documentos compartidos que definen las reglas del juego. Todos los leen.
- **Estatutos (por Módulo):** Documentos locales que cubren el mundo interno de cada app. Solo los lee quien trabaja ahí.
- Los Estatutos **referencian** a la Constitución, **nunca la duplican**.

### 2.1 Constitución (Nivel Hub — Obligatorio para todos)

| Documento | Ubicación | Contenido |
|-----------|-----------|-----------|
| `ARCHITECTURE.md` | Hub raíz | Shell, Core, Shared, reglas de integración (~100 líneas) |
| `PATTERN_INDEX.md` | Hub `.agent/knowledge/` | Solo reglas cross-app: Multi-Tenant, `useSupabaseQuery`, Module Isolation, ErrorBoundary |
| `DESIGN_SYSTEM.md` | Hub raíz | Emerald Stone completo + extensiones Tailwind v4 |
| `STORY.md` | ALPRO `.agent/knowledge/` | Narrativa única (24+ caps). NO se fragmenta |
| `BACKLOG.md` | Hub raíz | Solo items de la Shell/Core/Shared |

### 2.2 Estatutos (Nivel Módulo — Solo el equipo del módulo)

```
src/modules/
├── alpro/
│   ├── ARCHITECTURE.md     ← Los 3 Mundos, Zustand 10 slices, Services
│   ├── BACKLOG.md          ← Mejoras pendientes de ALPRO
│   └── PATTERNS.md         ← Reglas locales: minStock, Hybrid Units, etc.
│
├── forms/
│   ├── ARCHITECTURE.md     ← Motor JSONB, FormBuilder, ResponseFlow
│   ├── BACKLOG.md          ← Mejoras pendientes de Forms
│   └── PATTERNS.md         ← Reglas locales de Forms
│
└── taskmanager/
    ├── ARCHITECTURE.md
    ├── BACKLOG.md
    └── PATTERNS.md
```

### 2.3 Beneficio de Tokens/Contexto

| Escenario | Sin modelo | Con Constitución + Estatutos |
|-----------|:----------:|:----------------------------:|
| Dev toca solo Forms | Lee ~600 líneas (todo) | Lee ~200 líneas (Hub ARCH + Forms ARCH) |
| Agente audita ALPRO | Lee ~600 líneas (todo) | Lee ~200 líneas (Hub ARCH + ALPRO ARCH) |
| Nuevo dev se onboardea | Lee ~1000 líneas | Lee ~300 líneas (Capa 1 + su capa 2) |

---

## 3. Onboarding en Capas

```
Capa 1: hub-onboarding (OBLIGATORIO para TODOS)
    ├── Qué es el Hub y el modelo Constitución + Estatutos
    ├── Core + Shared (reglas del juego, ESLint, paths)
    ├── PBAC completo (permisos por módulo)
    ├── Multi-Tenant (organization_id + GlobalContext)
    ├── Design System Emerald Stone (resumen)
    └── Lectura obligatoria:
        ├── Hub/ARCHITECTURE.md
        ├── Hub/PATTERN_INDEX.md
        └── Hub/DESIGN_SYSTEM.md

Capa 2a: alpro-onboarding (Solo devs ALPRO)
    ├── Los Tres Mundos (ALPRO, Operaciones, Finanzas)
    ├── Zustand 10 slices + Services Pattern
    ├── STORY.md completo (24 capítulos)
    └── Lectura: modules/alpro/ARCHITECTURE.md + PATTERNS.md

Capa 2b: forms-onboarding (Solo Perry / devs Forms)
    ├── Motor JSONB y FormBuilder
    ├── Dashboard de respuestas
    └── Lectura: modules/forms/ARCHITECTURE.md

Capa 2c: taskmanager-onboarding (futuro)
    └── ...
```

**El actual `divergente-onboarding` se RENOMBRA** a `alpro-onboarding` (Capa 2a). No se borra, se reclasifica.

---

## 4. PBAC: Cobertura COMPLETA (No Simplificada)

El Hub **hereda todo** PBAC v3.1 de ALPRO + agrega guards por módulo:

| Herencia ALPRO | + Adiciones Hub |
|----------------|-----------------|
| Permisos granulares por array | `Permission.ALPRO_ACCESS` |
| Permisos efectivos (fallback) | `Permission.FORMS_*` |
| `checkAccess()` centralizado | `Permission.TASKMANAGER_*` |
| Protección cuenta maestra | `RequirePermission` guard |
| Multi-Tenant RLS | ESLint enforcement |

La skill `divergente-pbac-permissions` se **extiende** con sección "Hub Module Permissions". No se simplifica.

---

## 5. Skills: Crear, Renombrar, Extender

| Acción | Skill | Detalle |
|--------|-------|---------|
| **CREAR** | `hub-onboarding` | Capa 1: reglas del juego universales |
| **CREAR** | `hub-design-system` | Emerald Stone + Tailwind v4 CSS-first |
| **CREAR** | `forms-onboarding` | Capa 2b: Motor JSONB, FormBuilder |
| **RENOMBRAR** | `divergente-onboarding` → `alpro-onboarding` | Capa 2a: Los 3 Mundos, Zustand, Services |
| **EXTENDER** | `divergente-pbac-permissions` | Sección "Hub Module Permissions" |
| **EXTENDER** | `divergente-documentation-standard` | Sección "Constitution + Statutes model" |
| **ADAPTAR** | `divergente-ui-generation` | Actualizar a Tailwind v4 |
| **ADAPTAR** | `frontend-design` (instalada) | Fork con reglas Emerald Stone |

---

## 6. Documentos Existentes: Qué Cambia

| Documento Actual | Acción |
|-----------------|--------|
| ALPRO `ARCHITECTURE.md` (325 líneas) | Agregar §11: referencia cruzada al Hub. Se convierte en Estatuto ALPRO |
| ALPRO `PATTERN_INDEX.md` (3 reglas) | Migrar a `modules/alpro/PATTERNS.md`. Hub tiene su propio PATTERN_INDEX |
| ALPRO `IMPROVEMENTS.md` | Migrar items Hub (Fases 45-48) al Hub `BACKLOG.md`. ALPRO conserva sus items locales |
| ALPRO `STORY.md` (24 caps) | Agregar Cap. 25 "La Auditoría". Se mantiene como fuente única |
| ALPRO `DESIGN_SYSTEM.md` | Se copia/evoluciona al Hub como documento Constitución. ALPRO referencia al del Hub |
| Hub `ARCHITECTURE_PROPOSAL_ANTIGRAVITY.md` | Se formaliza como Hub `ARCHITECTURE.md` ligero |
| Hub `ARCHITECTURE_PROPOSAL_ROO.md` | Se archiva (renombrar a `_ARCHIVED_ROO_V1.md`) |
| Obsidian `07_Recursos/.../STORY.md` (5 caps) | Actualizar con cronología completa |

---

## 7. Coordinación Perry ↔ Platform Owner

| Zona | Dueño | PRs |
|------|-------|:---:|
| `core/`, `shared/`, CI/CD | Tú | Solo Tú |
| `modules/forms/`, `modules/taskmanager/` | Perry | Perry |
| `modules/alpro/` | Tú | Solo Tú |
| Constitución (Hub docs, Design System) | Tú | Solo Tú |
| Estatutos de su módulo | Cada dueño | Dueño del módulo |

Perry lee: **Capa 1 (hub-onboarding) + Capa 2b (forms-onboarding)** = contexto mínimo y preciso.

---

## 8. Checklist de Ejecución (Orden sugerido)

### Fase A: Constitución del Hub
- [ ] Crear Hub `ARCHITECTURE.md` (ligero, ~100 líneas basado en V2.5)
- [ ] Crear Hub `PATTERN_INDEX.md` (3 reglas cross-app)
- [ ] Crear Hub `BACKLOG.md` (migrar Fases 45-48 de IMPROVEMENTS)
- [ ] Migrar/evolucionar `DESIGN_SYSTEM.md` al Hub

### Fase B: Estatutos por Módulo
- [ ] Crear `modules/alpro/ARCHITECTURE.md` (basado en ALPRO actual)
- [ ] Crear `modules/alpro/PATTERNS.md` (migrar PATTERN_INDEX actual)
- [ ] Crear `modules/alpro/BACKLOG.md` (items locales de IMPROVEMENTS)
- [ ] Crear `modules/forms/ARCHITECTURE.md` (skeleton para Perry)

### Fase C: Skills
- [ ] Crear skill `hub-onboarding` (Capa 1)
- [ ] Renombrar `divergente-onboarding` → `alpro-onboarding` (Capa 2a)
- [ ] Crear skill `forms-onboarding` (Capa 2b)
- [ ] Crear skill `hub-design-system` (TW v4 + Emerald Stone)
- [ ] Extender `divergente-pbac-permissions` (sección Hub)
- [ ] Extender `divergente-documentation-standard` (modelo Constitución)

### Fase D: Formalizaciones
- [ ] Agregar Cap. 25 al `STORY.md`
- [ ] Actualizar ALPRO `ARCHITECTURE.md` §11 (referencia Hub)
- [ ] Archivar `ARCHITECTURE_PROPOSAL_ROO.md`
- [ ] Actualizar STORY en Obsidian
- [ ] Ready para PR#1

---
*Plan de Gobernanza V3 Final — Modelo "Constitución + Estatutos" — 2026-03-12*
