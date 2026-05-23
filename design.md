# Sistema de Diseño — jian.tree

## Principios

- **Dark-first**: fondo oscuro profundo como base, con acentos de color saturados.
- **Glassmorphism**: superficies translúcidas con `backdrop-blur` y bordes sutiles.
- **Motion sutil**: animaciones lentas (blobs) y transiciones cortas (hovers) para no distraer.
- **Jerarquía clara**: una sola acción primaria visible por sección.

---

## Colores

### Base
| Token | Valor | Uso |
|-------|-------|-----|
| `#0a0a0f` | Fondo profundo | Background de la página pública |
| `#0d0d14` | Fondo admin | Background del backoffice |
| `#16161f` | Surface | Navbar, cards de primer nivel |
| `#1e1e2e` | Surface 2 | Inputs, cards internas |

### Acento
| Token | Valor | Uso |
|-------|-------|-----|
| `violet-600` | `#7c3aed` | Botón primario, tab activo, toggle ON |
| `violet-400` | `#a78bfa` | Texto activo en tabs |

### Semánticos
| Token | Valor | Uso |
|-------|-------|-----|
| `emerald-400` | `#34d399` | Indicador "online" del avatar |
| `red-400` | `#f87171` | Acciones destructivas |
| `white/40` | — | Texto secundario / muted |
| `white/8` | — | Bordes sutiles |

### Plataformas
Cada red social tiene su color de marca definido en `src/data/platforms.jsx`:

| Plataforma | Color |
|------------|-------|
| Instagram | `linear-gradient(135deg, #f58529, #dd2a7b, #8134af)` |
| Facebook | `#1877f2` |
| YouTube | `#ff0000` |
| TikTok | `#111827` |
| Twitter / X | `#111827` |
| WhatsApp | `#25d366` |
| LinkedIn | `#0a66c2` |
| Twitch | `#9146ff` |
| Spotify | `#1db954` |
| GitHub | `#374151` |
| Sitio web | `#64748b` |

---

## Tipografía

**Fuente:** Inter (Google Fonts)  
**Pesos usados:** 400 · 500 · 600 · 700

| Elemento | Tamaño | Peso |
|----------|--------|------|
| Nombre de usuario | `1.35rem` | 700 |
| Handle | `0.85rem` | 400 |
| Bio | `0.875rem` | 400 |
| Etiqueta de link | `0.95rem` | 600 |
| Sublabel de link | `0.75rem` | 400 |
| Navbar logo | `1.05rem` | 700 |
| Labels de form | `0.8rem` | 500 |
| Section labels | `0.72rem` | 600 (uppercase) |

---

## Espaciado

Basado en la escala de Tailwind (múltiplos de 4px). Valores más usados:

- Padding de card: `py-12 px-8` (48px / 32px)
- Gap entre links: `14px`
- Border radius de card: `28px` (`rounded-[28px]`)
- Border radius de botones de link: `16px` (`rounded-2xl`)
- Border radius de inputs: `10px` (`rounded-[10px]`)

---

## Efectos

### Glassmorphism (clase utilitaria `.glass`)
```css
background: rgba(255,255,255,0.05);
backdrop-filter: blur(24px);
border: 1px solid rgba(255,255,255,0.10);
```

### Blobs animados
Tres círculos con `filter: blur(80px)` y `opacity: 0.35` en posición `fixed`.  
Animación `drift`: traslación suave de 40px + scale de 1 → 1.1 en 12s, `infinite alternate`.  
Delays: `0s`, `-4s`, `-8s` para desincronizarlos.

| Blob | Color | Posición |
|------|-------|----------|
| 1 | `violet-700` | Top-left |
| 2 | `pink-600` | Bottom-right |
| 3 | `blue-600` | Centro-derecha |

### Hover en link buttons
1. `translateY(-3px) scale(1.01)` en el contenedor.
2. Overlay con el color de la plataforma aparece (`opacity: 0 → 1`).
3. `box-shadow` con el color de la plataforma al 40% de opacidad.
4. Flecha `→` se desplaza 3px a la derecha y gana opacidad.

### Phone preview (admin)
Frame de 260×548px con `overflow: hidden` y `border-radius: 36px`.  
El contenido interno es `390×844px` escalado con `transform: scale(0.6667)` y `transform-origin: top left`.

---

## Componentes

### `<PublicPage>`
Acepta prop `data` (para preview) o lee del Context. Prop `preview` cambia `min-h-screen` → `min-h-[844px]`.

### `<LinkBtn>`
Maneja su propio estado `hovered` para los efectos de color dinámicos que no se pueden expresar con clases Tailwind estáticas.

### `<PlatformIcon>`
Componente genérico en `platforms.jsx`. Recibe `platform` y `size`, renderiza un SVG con el color de fondo de la plataforma.

### `<PhonePreview>`
Renderiza `<PublicPage preview>` directamente escalado — sin iframe, sin postMessage. La preview es instantánea porque lee del mismo Context.
