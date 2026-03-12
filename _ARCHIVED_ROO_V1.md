# 🏛️ Propuesta de Arquitectura: Divergente Hub

**Versión:** 1.0  
**Fecha:** 2026-03-11  
**Autor:** Roo (Arquitecto)  
**Tipo:** Propuesta para Análisis

---

## 📋 Resumen Ejecutivo

Esta propuesta presenta la arquitectura recomendada para **Divergente-Hub**, una aplicación monorrepo con múltiples módulos de negocio (ERP, Formularios, Dashboard, etc.) construida con React + TypeScript + Vite.

**Filosofía:** Modularidad, escalabilidad y reutilización de código.

---

## 1. 🎯 Visión del Proyecto

### 1.1 Definición
**Divergente-Hub** es una plataforma empresarial unificada que centraliza múltiples módulos de negocio bajo una misma interfaz, compartiendo infraestructura, autenticación y componentes UI.

### 1.2 Módulos Planificados

| Módulo | Descripción | Prioridad |
|--------|------------|----------|
| **Dashboard Central** | Panel unificado con KPIs de todos los módulos | Alta |
| **Diver Forms** | Motor de formularios dinámicos (RRHH, Encuestas) | Alta |
| **Diver Analytics** | Reportes y Business Intelligence | Media |
| **Diver Kitchen** | KDS para cocina (migración desde ALPRO) | Media |
| **Diver Crew** | App gamificada para staff | Baja |

### 1.3 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| React 18+ | UI Framework |
| TypeScript | Tipado estático |
| Vite | Build tool |
| Zustand | Estado global |
| Supabase | Backend (Auth + DB) |
| Tailwind CSS | Estilos |
| React Router | Navegación |

---

## 2. 🏗️ Arquitectura Propuesta

### 2.1 Patrón de Arquitectura

Se propone una arquitectura de **Módulos Aislados con Núcleo Compartido**:

```
┌─────────────────────────────────────────────────────────┐
│                    Divergente-Hub                        │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Dashboard│  │  Forms   │  │Analytics │  ...        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       │             │             │                      │
│       └─────────────┴─────────────┘                      │
│                     │                                    │
│         ┌───────────┴───────────┐                       │
│         │    Core / Shared      │                       │
│         │  (UI + Services)     │                       │
│         └───────────────────────┘                       │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Principios de Diseño

1. **Core Compartido:** UI components, auth, servicios transversales
2. **Módulos Aislados:** Cada módulo tiene su propia lógica de negocio
3. **Navegación por Rutas:** `/dashboard`, `/forms`, `/analytics`, etc.
4. **Estado Global Unificado:** Un solo store para autenticación y estado app

---

## 3. 📂 Estructura de Carpetas Propuesta

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Router + Layout principal
│
├── components/              # UI Components (CORE)
│   ├── ui/                  # Componentes base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   ├── Toast.tsx
│   │   ├── Table.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   ├── layout/              # Componentes de layout
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── MainLayout.tsx
│   │   └── MobileNav.tsx
│   └── forms/               # Componentes de formularios
│       ├── FormField.tsx
│       ├── DynamicForm.tsx
│       └── FormBuilder.tsx
│
├── modules/                  # Módulos de negocio
│   ├── dashboard/           # Dashboard central
│   │   ├── DashboardView.tsx
│   │   ├── components/
│   │   │   ├── KPICard.tsx
│   │   │   └── ActivityFeed.tsx
│   │   ├── hooks/
│   │   │   └── useDashboardData.ts
│   │   └── types/
│   │       └── dashboard.types.ts
│   │
│   ├── forms/               # Diver Forms 
│   │   ├── FormsListView.tsx
│   │   ├── FormBuilderView.tsx
│   │   ├── FormResponseView.tsx
│   │   ├── components/
│   │   │   ├── FormRenderer.tsx
│   │   │   └── ResponseTable.tsx
│   │   ├── hooks/
│   │   │   └── useForms.ts
│   │   └── types/
│   │       └── forms.types.ts
│   │
│   ├── analytics/           # Diver Analytics
│   │   ├── AnalyticsView.tsx
│   │   ├── components/
│   │   │   ├── Charts.tsx
│   │   │   └── ReportBuilder.tsx
│   │   ├── hooks/
│   │   │   └── useAnalytics.ts
│   │   └── types/
│   │       └── analytics.types.ts
│   │
│   └── [modulo-futuro]/    # Plantilla para nuevos módulos
│       ├── ModuleView.tsx
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── shared/                  # Código compartido entre módulos
│   ├── types/              # Tipos transversales
│   │   ├── user.ts         # Usuario, Rol
│   │   ├── organization.ts # Organización (multi-tenant)
│   │   ├── permissions.ts  # Permisos PBAC
│   │   └── common.ts        # Tipos genéricos
│   ├── hooks/              # Hooks reutilizables
│   │   ├── useAuth.ts
│   │   ├── usePermissions.ts
│   │   └── useFetch.ts
│   ├── services/           # Servicios transversales
│   │   ├── authService.ts
│   │   ├── supabaseClient.ts
│   │   ├── apiClient.ts
│   │   └── notificationService.ts
│   ├── utils/              # Utilidades
│   │   ├── dateUtils.ts
│   │   ├── validationUtils.ts
│   │   └── formatUtils.ts
│   └── constants/           # Constantes compartidas
│       └── routes.ts       # Definición de rutas
│
├── stores/                 # Estado global (Zustand)
│   ├── useAuthStore.ts     # Autenticación y permisos
│   ├── useAppStore.ts      # Estado general (theme, sidebar)
│   └── useNotificationStore.ts
│
├── config/                 # Configuración
│   ├── supabase.ts         # Configuración de Supabase
│   ├── features.ts         # Feature flags
│   └── constants.ts        # Constantes de app
│
└── styles/                 # Estilos globales
    └── index.css           # Tailwind + styles
```

---

## 4. 🔧 Gestión de Tipos por Dominio

### 4.1 Principios

1. **Tipos Transversales → `shared/types/`**
   - Tipos usados por múltiples módulos
   - Ej: User, Organization, Permission

2. **Tipos de Módulo → `modules/[modulo]/types/`**
   - Tipos específicos de un módulo
   - Ej: Form, FormResponse (solo para Forms)

3. **NO separar tipos existentes de ALPRO**
   - Mantener `types.ts` de ALPRO sin cambios
   - Los nuevos módulos definen sus propios tipos

### 4.2 Estructura de Tipos Transversales

```typescript
// shared/types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  organizationId: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: number;
}

// shared/types/organization.ts
export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  settings: OrganizationSettings;
}

// shared/types/permissions.ts
export enum Permission {
  // Dashboard
  DASHBOARD_VIEW = 'DASHBOARD_VIEW',
  
  // Forms
  FORMS_CREATE = 'FORMS_CREATE',
  FORMS_VIEW = 'FORMS_VIEW',
  FORMS_EDIT = 'FORMS_EDIT',
  FORMS_DELETE = 'FORMS_DELETE',
  
  // Analytics
  ANALYTICS_VIEW = 'ANALYTICS_VIEW',
  ANALYTICS_EXPORT = 'ANALYTICS_EXPORT',
  
  // Admin
  ADMIN_USERS = 'ADMIN_USERS',
  ADMIN_SETTINGS = 'ADMIN_SETTINGS',
}
```

---

## 5. 🎨 Sistema de Diseño (Emerald Stone)

### 5.1 Componentes UI Core

Los componentes base vivirán en `components/ui/` y serán reutilizados por todos los módulos:

```typescript
// Ejemplo de uso
import { Button, Card, Input, Modal } from '@/components/ui';
import { Badge } from '@/components/ui';
```

### 5.2 Configuración de Theme

```typescript
// tailwind.config.js (extend)
export default {
  theme: {
    extend: {
      colors: {
        // Emerald Stone
        emerald: { 50: '#ECFDF5', 600: '#059669', 700: '#047857', 800: '#065F46' },
        stone: { 50: '#FAFAF9', 100: '#F5F5F4', 200: '#E7E5E4', 900: '#1C1917' },
      },
      borderRadius: {
        '3xl': '1.5rem',
      }
    }
  }
}
```

---

## 6. 🔐 Autenticación y Permisos

### 6.1 Flujo de Auth

```
1. Usuario entra a /
2. App verifica sesión de Supabase
3. Si hay sesión → Carga permisos → Redirige a Dashboard
4. Si no hay sesión → Redirige a /login
```

### 6.2 Sistema de Permisos

Se hereda el modelo **PBAC** de ALPRO:

```typescript
// shared/hooks/usePermissions.ts
import { useAuthStore } from '@/stores/useAuthStore';
import { Permission } from '@/shared/types/permissions';

export const usePermissions = () => {
  const { hasPermission } = useAuthStore();
  
  return {
    can: (permission: Permission) => hasPermission(permission),
    canAny: (permissions: Permission[]) => permissions.some(hasPermission),
  };
};

// Uso en componentes
const { can } = usePermissions();

{can(Permission.FORMS_CREATE) && <CreateFormButton />}
```

---

## 7. 🗺️ Navegación y Rutas

### 7.1 Definición de Rutas

```typescript
// shared/constants/routes.ts
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  FORMS: '/forms',
  FORMS_CREATE: '/forms/create',
  FORMS_RESPONSE: '/forms/:id/responses',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;
```

### 7.2 Estructura del Router

```typescript
// App.tsx
<Routes>
  <Route path={ROUTES.LOGIN} element={<LoginView />} />
  
  <Route element={<MainLayout />}>
    <Route path={ROUTES.DASHBOARD} element={<DashboardView />} />
    <Route path={ROUTES.FORMS} element={<FormsListView />} />
    <Route path={ROUTES.FORMS_CREATE} element={<FormBuilderView />} />
    <Route path={ROUTES.ANALYTICS} element={<AnalyticsView />} />
  </Route>
</Routes>
```

---

## 8. 🚀 Roadmap de Implementación

### Fase 1: Fundamentos (Semana 1-2)
- [ ] Configurar proyecto Vite + React + TypeScript
- [ ] Implementar `shared/` (types, hooks, services)
- [ ] Crear `components/ui/` base (Button, Card, Input, Modal)
- [ ] Configurar autenticación con Supabase
- [ ] Implementar navegación básica

### Fase 2: Dashboard Central (Semana 3)
- [ ] Crear módulo Dashboard
- [ ] Integrar KPIs de ALPRO (vía API)
- [ ] Widgets de actividad reciente

### Fase 3: Diver Forms (Semana 4-6)
- [ ] Crear módulo Forms
- [ ] Motor de formularios dinámicos (JSONB)
- [ ] Form Builder
- [ ] Vista de respuestas

### Fase 4: Diver Analytics (Semana 7-8)
- [ ] Crear módulo Analytics
- [ ] Gráficos y reportes
- [ ] Exportación de datos

### Fase 5: Mejoras (Continuo)
- [ ] Diver Kitchen
- [ ] Diver Crew
- [ ] Testing
- [ ] Performance

---

## 9. 📊 Comparación de Opciones

| Aspecto | Opción A: Módulos en una app | Opción B: Multi-app (npm) |
|---------|------------------------------|--------------------------|
| Complejidad inicial | Baja | Alta |
| Reutilización | Alta | Muy alta |
| Despliegue | Unificado | Independiente |
| Mantenimiento | Simple | Distribuido |
| Recomendado para | 2-5 módulos | 5+ módulos |

**Esta propuesta usa Opción A** por su simplicidad y suitability para el caso de uso actual.

---

## 10. ✅ Conclusión

Esta propuesta de arquitectura proporciona:

1. **Modularidad:** Cada módulo tiene su propia carpeta, tipos y lógica
2. **Reutilización:** Componentes UI y servicios compartidos
3. **Escalabilidad:** Estructura que permite agregar nuevos módulos fácilmente
4. **Mantenibilidad:** Separación clara de responsabilidades
5. **Consistencia:** UI unificada con Emerald Stone

---

## 📝 Notas

- Esta propuesta asume Supabase como backend
- Los tipos de ALPRO existentes NO se migran (son específicos del dominio)
- La autenticación es centralizada en `shared/`
- Los permisos PBAC se extienden para nuevos módulos

---

*Propuesta elaborada por Roo (Arquitecto)*  
*Fecha: 2026-03-11*
