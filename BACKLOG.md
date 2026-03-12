# 📋 Backlog — Divergente Hub (Constitución)

> **Status:** Activo  
> **Última actualización:** 2026-03-12  
> **Scope:** Solo items de Shell/Core/Shared. Cada módulo tiene su propio `BACKLOG.md`.

---

## 1. 🔴 Críticas (Bloquean siguiente PR)

### 1.1 PR#1: Shell + Router + Guards + Providers
- [ ] Instalar: `react-router-dom`, `@tanstack/react-query`, `vitest`, `@testing-library/react`, `jsdom`
- [ ] Agregar scripts: `type-check`, `test:run`
- [ ] Crear `core/auth/AuthGuard.tsx`
- [ ] Crear `core/pbac/RequirePermission.tsx`
- [ ] Crear `core/org/useCurrentOrg.ts` (stub hardcoded)
- [ ] Crear `core/providers/AppProviders.tsx` (QueryClientProvider)
- [ ] Crear `core/providers/ModuleErrorBoundary.tsx`
- [ ] Crear `core/router/Router.tsx` (Lazy + Guards + Suspense + ErrorBoundary)
- [ ] Configurar path aliases (`@/`) en `tsconfig.app.json` + `vite.config.ts`
- [ ] Mover `supabaseClient.ts` a `shared/services/`
- [ ] Smoke Test: `/alpro` → 403, `/forms` → 403, `/` → CoreLoader

### 1.2 PR#2: CI/CD Workflow
- [ ] `.github/workflows/main.yml`: `type-check` + `vitest run` on push to main

## 2. 🟡 Importantes (Próximo sprint)

### 2.1 PR#3: Shared Hooks + ESLint Rules
- [ ] `shared/hooks/useSupabaseQuery.ts` con `GlobalContext`
- [ ] `shared/hooks/useRealtimeSubscription.ts`
- [ ] ESLint `no-restricted-imports` para `@supabase/supabase-js`

### 2.2 PR#4: Shared UI Kit
- [ ] `shared/ui/` Top 5: Button, Card, Modal, Input, Table
- [ ] `shared/ui/__tests__/Button.test.tsx` (Hello World RTL)

## 3. 🟢 Futuro (Backlog abierto)

### 3.1 Fase 46: Divergente Launchpad (SSO)
- [ ] Front-End Single Sign-On unificado
- [ ] Token JWT central de Supabase

### 3.2 Fase 47: Integración Telegram Bot
- [ ] Edge Functions multitenant para notificaciones
- [ ] Interactive Callbacks (aprobar/rechazar desde chat)
- [ ] Seguridad PBAC para filtrado de permisos

### 3.3 Fase 48: PWA
- [ ] Etapa 1: Caché de App-Shell + assets
- [ ] Etapa 2: Outbox/Queue para escrituras offline

### 3.4 Dashboard con KPIs
- [ ] Supabase views/RPCs para datos agregados de ALPRO
- [ ] Widgets consumidos vía Module Exports contract

---
*Backlog — Nivel Constitución del Hub — 2026-03-12*
