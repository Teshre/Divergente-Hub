# 📚 Knowledge Base — Divergente Hub

> Este directorio contiene el **cerebro** del proyecto: decisiones, planes, y la historia viva.

## Estructura

```
knowledge/
├── plans/          ← Planes de implementación inmutables (YYYY-MM-DD-nombre.md)
├── brainstorms/    ← Artefactos de lluvia de ideas
├── STORY.md        ← Narrativa del Hub (continuación del STORY de ALPRO)
└── backlog/        ← Pendientes y bugs
    └── (Ver BACKLOG.md en raíz como fuente de verdad)
```

## Reglas (Hybrid Model)
1. **Inmutabilidad:** Una vez un plan se aprueba, NO se sobrescribe. Se agrega una sección `## Update [Date]`.
2. **Fechas:** Los nombres de archivo inician con `YYYY-MM-DD`.
3. **Separación:** Brainstorms y decisiones aquí. Documentación técnica pública en `docs/`.
4. **Storytelling:** Cada fase completada agrega un capítulo a `STORY.md`.
