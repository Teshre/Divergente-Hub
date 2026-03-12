# 🎨 Estudio Orgánico Divergente — Design System (Constitución Hub)

> **Versión:** 2.0 (Hub-Ready, Tailwind CSS v4)  
> **Basado en:** ALPRO `DESIGN_SYSTEM.md` v1.1  
> **Scope:** Aplica a TODOS los módulos del Hub.

---

## 1. Paleta de Colores: Emerald & Stone

### Primarios
| Token | Valor | Uso |
|-------|-------|-----|
| `emerald-500` | `#10B981` | CTAs principales, success |
| `emerald-600` | `#059669` | Hover de CTAs |
| `emerald-700` | `#047857` | Active states |
| `stone-50` | `#FAFAF9` | Background principal (NO blanco puro) |
| `stone-100` | `#F5F5F4` | Cards, superficies |
| `stone-500` | `#78716C` | Texto secundario |
| `stone-800` | `#292524` | Texto primario |
| `stone-900` | `#1C1917` | Encabezados, bordes |

### Funcionales
| Token | Valor | Uso |
|-------|-------|-----|
| `red-500/600` | — | Error, destructivo |
| `amber-500/600` | — | Warning, alertas |
| `blue-500/600` | — | Info, links |

### Regla de Alto Contraste (v1.1)
- **Backgrounds claros** (stone-50/100): Texto en `stone-800` o `stone-900`.
- **Backgrounds oscuros** (stone-800/900): Texto en `white` o `stone-100`.
- **NUNCA** texto `stone-500` sobre fondo `stone-100` (contraste insuficiente).

---

## 2. Tipografía

| Elemento | Font | Clase |
|----------|------|-------|
| Todo el UI | **Inter** (Google Fonts) | `font-sans` |
| Código/datos numéricos | **JetBrains Mono** | `font-mono` |
| Tamaños | `text-sm` base, `text-lg` headers, `text-2xl`+ títulos | — |

---

## 3. Componentes UI

### Botones
```
Primary:   bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2.5
Secondary: bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl border border-stone-200
Danger:    bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200
Ghost:     hover:bg-stone-100 text-stone-600 rounded-xl
```

### Cards
```
Standard:  bg-white rounded-2xl shadow-sm border border-stone-200 p-6
Glass:     bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6
Hover:     hover:shadow-md hover:border-emerald-200 transition-all duration-200
```

### Inputs
```
Standard:  bg-white border border-stone-300 rounded-xl px-4 py-2.5
           focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
Search:    Con icono Search de Lucide a la izquierda (pl-10)
```

### Modales
```
Overlay:   bg-black/50 backdrop-blur-sm
Container: bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 p-6
Mobile:    Bottom-Sheet Pattern (emerge desde la base)
```

---

## 4. Efectos Visuales

### Glassmorphism
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.60);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.20);
  border-radius: 1rem; /* rounded-2xl */
}
```

### Animaciones
| Nombre | Uso | Clase |
|--------|-----|-------|
| `fadeIn` | Entrada de modales, toasts | `animate-fadeIn` |
| `zoomIn` | Confirmaciones exitosas | `animate-zoomIn` |
| `slideUp` | Bottom-sheets, drawers | `animate-slideUp` |
| `pulse` | Loading states, status vivos | `animate-pulse` |
| `breathing` | Timers activos (KDS) | Escala infinita suave |

### Micro-interacciones
- **Hover cards:** `hover:shadow-md hover:border-emerald-200 transition-all`
- **Press cards:** `active:scale-95 transition-transform`
- **Resplandor emerald:** `hover:shadow-emerald-500/20`

---

## 5. Iconografía

**Librería:** `lucide-react`

| Contexto | Tamaño |
|----------|--------|
| Inline (botones, badges) | `size={16}` |
| Estándar (nav, cards) | `size={20}` |
| Feature (empty states, headers) | `size={24}` - `size={32}` |

**NUNCA** mezclar librerías de iconos. Solo Lucide React.

---

## 6. Reglas UX

### Espaciado Premium
- **Mínimo padding interno:** `p-4` (16px)
- **Gap entre cards:** `gap-4` (16px) mínimo
- **Secciones:** Separar con `mb-8` o `border-b border-stone-200`

### DiverVibe: Personalidad de Marca
| Principio | Manifestación UI |
|-----------|-----------------|
| Orgánico | Esquinas redondeadas `rounded-xl` a `rounded-2xl` |
| Elegante | Sombras sutiles, colores stone, Inter font |
| Vivo | Micro-animaciones en CTAs y confirmaciones |
| Profesional | Sin colores saturados, sin fonts decorativos |

### Prohibiciones
- ❌ Fondos blancos puros (`bg-white` como fondo general) → Usar `bg-stone-50`
- ❌ Bordes grises genéricos → Usar `border-stone-200`
- ❌ Texto gris plano → Usar escala stone para contraste
- ❌ Alertas con colores saturados puros → Usar variantes suaves (ej: `bg-red-50 text-red-600`)
- ❌ Esquinas con `rounded-sm` o `rounded` → Mínimo `rounded-xl`

---

## 7. Tailwind v4: Notas de Migración

Divergente Hub usa **Tailwind CSS v4** con configuración CSS-first:

```css
/* En main.css */
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

- **No hay `tailwind.config.js`** — la configuración vive en CSS
- **Los tokens custom** se definen vía `@theme { }`
- **Dark mode** se configura vía `@media (prefers-color-scheme: dark)` cuando se necesite

---
*Design System "Emerald Stone" — Constitución Hub — 2026-03-12*
