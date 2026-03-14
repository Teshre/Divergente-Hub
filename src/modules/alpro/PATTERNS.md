# 📐 Reglas Locales: ALPRO ERP

> **Versión:** 1.0  
> **Referencia:** Este documento complementa al [PATTERN_INDEX.md](../../../PATTERN_INDEX.md) de la Constitución.

---

## 1. Gestión de Unidades Híbridas (PZ ↔ KG)

Toda lógica de conversión debe usar el `HybridUnitService`. No se permiten cálculos manuales de `piezas * pesoPromedio` en componentes UI.

## 2. Límite de Stock y Auditoría

- **Mínimo Crítico:** Solo se dispara alerta si `stock < min_stock` (excluyente).
- **Cierre Diario:** Obligatorio antes de iniciar auditorías físicas ciegas.

## 3. Estado de UI y Persistencia

- Los modales deben usar el patrón **Bottom-Sheet** en móvil para maximizar la ergonomía.
- El estado de los filtros en `InventoryView` debe persistir en `SessionStorage`.

---
*Divergente Hub — Módulo ALPRO — 2026-03-13*
