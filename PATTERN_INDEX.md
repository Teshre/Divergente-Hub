# 📐 Pattern Index: Reglas Cross-App del Hub (Constitución)

> Estas reglas aplican a **TODOS** los módulos del Hub.  
> Cada módulo puede tener reglas locales adicionales en `modules/*/PATTERNS.md`.  
> Si cambias una regla aquí, **afecta a todo el ecosistema**.

---

## 1. Data Access Layer (Obligatorio)
- **Regla**: Todo acceso a Supabase **DEBE** pasar por `useSupabaseQuery` con `GlobalContext`.
- **Enforcement**: ESLint `no-restricted-imports` bloquea `@supabase/supabase-js` fuera de `shared/`.
- **Excepción**: `shared/services/supabaseClient.ts` es el único punto de creación del cliente.
- **Archivos Afectados**: Todos en `modules/*/`.

```typescript
// ✅ CORRECTO — Usar siempre el hook centralizado
const { data } = useSupabaseQuery('inventory', { select: '*' });

// ❌ INCORRECTO — Import directo de Supabase
import { supabase } from '@supabase/supabase-js'; // ESLint ERROR
```

## 2. Module Isolation (Obligatorio)
- **Regla**: Los módulos **NO** pueden importar entre sí. Solo de `shared/` y `core/`.
- **Enforcement**: ESLint `no-restricted-imports` en `eslint.config.js`.
- **Datos Cross-Module**: Vía Supabase views/RPCs, nunca imports directos.

```typescript
// ✅ CORRECTO — Import desde shared
import { Button } from '@/shared/ui';
import { useSupabaseQuery } from '@/shared/hooks';

// ❌ INCORRECTO — Import cruzado entre módulos
import { AlproStore } from '@/modules/alpro/stores'; // ESLint ERROR
```

## 3. Error Boundaries (Obligatorio)
- **Regla**: Todo módulo lazy-loaded lleva **triple barrera**: Guard + Suspense + ErrorBoundary.
- **Patrón**: Ver `ARCHITECTURE.md` §6.
- **Archivos Afectados**: `core/router/Router.tsx`.

## 4. Multi-Tenant Isolation (Obligatorio)
- **Regla**: El `organization_id` es obligatorio en TODAS las queries y payloads.
- **Mecanismo**: `useSupabaseQuery` lo inyecta automáticamente desde `GlobalContext`.
- **Defense-in-Depth**: RLS en Supabase como red de seguridad final.
- **Archivos Afectados**: Todos los que acceden a datos.

## 5. Path Aliases (Obligatorio)
- **Regla**: Usar `@/` para todos los imports dentro de `src/`.
- **Configuración**: `tsconfig.app.json` paths + `vite.config.ts` alias.

```typescript
// ✅ CORRECTO
import { Button } from '@/shared/ui';

// ❌ INCORRECTO
import { Button } from '../../../shared/ui';
```

---
*Pattern Index — Nivel Constitución — Divergente Hub*
