# Plan: Hub V2.5 Constitución + Gobernanza

> **Fecha:** 2026-03-12  
> **Status:** ✅ Completado  
> **Auditoría:** 8.6/10 (2 auditores independientes)

---

## Objetivo
Formalizar la arquitectura del Hub V2.5 como documentación viva siguiendo el modelo "Constitución + Estatutos".

## Decisiones Clave

### 1. Modelo de Documentación
- **Constitución (Hub):** Docs ligeros (~100 líneas) que definen reglas universales
- **Estatutos (por Módulo):** Docs locales que cubren el mundo interno de cada app
- Los Estatutos referencian a la Constitución, nunca la duplican

### 2. Onboarding en Capas
- **Capa 1 (hub-onboarding):** Obligatorio para todos
- **Capa 2a (alpro-onboarding):** Rename del actual `divergente-onboarding`
- **Capa 2b (forms-onboarding):** Para Perry

### 3. PBAC: Herencia Completa
- El Hub hereda todo PBAC v3.1 de ALPRO sin simplificar
- Se extiende con permisos por módulo: `ALPRO_ACCESS`, `FORMS_*`, `TASKMANAGER_*`

### 4. STORY Unificado
- Los 24 capítulos de ALPRO se mantienen en una sola narrativa
- El Hub tiene su propio STORY como continuación

## Archivos Creados (Fase A)
- `ARCHITECTURE.md` — Constitución del Hub
- `PATTERN_INDEX.md` — 5 reglas cross-app
- `BACKLOG.md` — PR#1-4 + Fases futuras
- `DESIGN_SYSTEM.md` — Emerald Stone + Tailwind v4
- `knowledge/README.md` — Estructura del Hybrid Model
- `knowledge/STORY.md` — Capítulo 1 del Hub

## Archivos Archivados
- `ARCHITECTURE_PROPOSAL_ROO.md` → `_ARCHIVED_ROO_V1.md`

## Referencia
- [Governance Plan V3](file:///C:/Users/Divergente%20Lap/.gemini/antigravity/brain/dcd92941-4861-4a53-939d-8d2a1b8bc172/implementation_plan.md)
- [ARCHITECTURE_PROPOSAL_ANTIGRAVITY.md](file:///x:/APP-PROGRAMAS/Divergente-Hub/ARCHITECTURE_PROPOSAL_ANTIGRAVITY.md) (V2.5 original)

---
QCQC
