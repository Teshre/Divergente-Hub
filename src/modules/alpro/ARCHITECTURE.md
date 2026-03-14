# 📜 Estatutos del Módulo: ALPRO ERP

> **Versión:** 1.0 (Hub Integration)  
> **Tipo:** Documento de Estatutos — Obligatorio para devs de ALPRO  
> **Referencia Superior:** [Constitución del Hub](../../../ARCHITECTURE.md)

---

## 1. Propósito y Alcance

ALPRO (Almacén y Producción) es el motor de gestión de recursos del ecosistema Divergente. Su misión es digitalizar la realidad física del negocio a través de la precisión matemática y operativa.

### Los Tres Mundos de ALPRO
Fiel a su origen, ALPRO opera bajo la filosofía de "Los Tres Mundos":
1.  **🏭 Mundo 1: ALPRO (Mente/Gestión):** Control de inventario maestro, costos y planificación (Gerencia y Almacén).
2.  **⚡ Mundo 2: OPERACIONES (Cuerpo/Ejecución):** Piso de venta, KDS, toma de inventario y mermas (Staff y Baristas).
3.  **💰 Mundo 3: FINANZAS (Conciencia/Auditoría):** Tesorería, cuentas por pagar y rentabilidad (Directores).

---

## 2. Relación con la Constitución (Hub)

Este módulo es una **isla aislada** que cumple con las leyes de la Shell:
- **Tenant Isolation:** No existen queries directas a Supabase. Se usa mandatoriamente `useSupabaseQuery`.
- **PBAC:** El acceso al módulo está condicionado al permiso `ALPRO_ACCESS`.
- **UI Architecture:** Uso estricto de `shared/ui` y paleta **Emerald Stone**.

---

## 3. Arquitectura Técnica Local

### Entry Point
- **Archivo:** `AlproEntryPoint.tsx`
- **Función:** Actúa como el orquestador del módulo. Inicializa los stores locales y monta las rutas internas envueltas en un `ModuleErrorBoundary`.

### Estado Local (Zustand Slices)
A diferencia del Core del Hub, ALPRO mantiene su lógica de negocio en stores locales (10 slices) que no contaminan el estado global del Hub:
- `useInventoryStore`
- `useRecipeStore`
- `usePurchaseStore`
- (etc.)

### Capa de Servicios
La lógica de negocio reside en `modules/alpro/services/`, desacoplada de los componentes React.

---

## 4. Mapa de Navegación del Módulo

| Ruta | Vista Principal | Función |
|------|-----------------|---------|
| `/alpro/inventory` | `InventoryView` | Maestro de productos y Kardex |
| `/alpro/kitchen` | `KitchenMode` | KDS (Kitchen Display System) |
| `/alpro/finance` | `FinanceView` | Tesorería y Balance |

---

## 5. Permisos PBAC Locales

ALPRO utiliza el array de permisos heredado del Core para habilitar funcionalidades específicas:
- `INVENTORY_VIEW`, `INVENTORY_MANAGE`
- `RECIPES_VIEW`, `RECIPES_VIEW_COSTS`
- `PURCHASING_CREATE`, `PURCHASING_RECEIVE`

---

## 6. Convenciones Específicas
- **Unidades Híbridas:** Conversión PZ ↔ KG centralizada en `HybridUnitService`.
- **Límite de Tamaño:** Máximo 888 líneas por componente.
- **Naming:** Archivos en `PascalCase`, carpetas en `kebab-case`.

---
*Divergente Hub — Módulo ALPRO — 2026-03-13*
