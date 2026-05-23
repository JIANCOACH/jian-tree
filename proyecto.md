# jian.tree — Documentación del proyecto

## ¿Qué es?

Clon de Linktree: una página personal que centraliza todos tus links de redes sociales en una sola URL. Incluye un backoffice para administrar el contenido sin tocar código.

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| UI | React 18 |
| Estilos | Tailwind CSS v3 |
| Bundler | Vite 5 |
| Routing | React Router v6 |
| Estado | Context API + localStorage |
| Fuente | Inter (Google Fonts) |
| Íconos | SVG inline (sin dependencias) |

---

## Cómo correr el proyecto

### Requisitos
- Node.js 18+ ([descargar](https://nodejs.org))

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
# → http://localhost:5173
```

### Build de producción
```bash
npm run build
npm run preview
```

---

## Rutas

| URL | Descripción |
|-----|-------------|
| `/` | Página pública (vista de visitantes) |
| `/admin` | Backoffice de administración |

---

## Estructura de archivos

```
jian-tree/
├── index.html              # Entry point de Vite
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx            # Punto de entrada React
    ├── App.jsx             # Router + StoreProvider
    ├── index.css           # Tailwind directives + utilidades custom
    │
    ├── data/
    │   ├── platforms.jsx   # Definiciones de redes sociales + <PlatformIcon>
    │   └── defaults.js     # Datos de ejemplo iniciales
    │
    ├── store/
    │   └── StoreContext.jsx # Context API: estado global + persistencia
    │
    ├── pages/
    │   ├── PublicPage.jsx  # Página pública del linktree
    │   └── AdminPage.jsx   # Layout del backoffice
    │
    └── components/admin/
        ├── Navbar.jsx       # Barra superior con botón Guardar
        ├── StatsBar.jsx     # Tarjetas de estadísticas (total / visibles / ocultos)
        ├── LinksTab.jsx     # Lista de links + drag & drop + CRUD
        ├── LinkCard.jsx     # Tarjeta individual de link (expandible)
        ├── AddLinkModal.jsx # Modal para agregar nuevo link
        ├── ProfileTab.jsx   # Formulario de perfil
        └── PhonePreview.jsx # Mockup de teléfono con preview en vivo
```

---

## Modelo de datos

Guardado en `localStorage` bajo la clave `jiantree`:

```json
{
  "profile": {
    "avatar": "🌿",
    "name": "Jian Guajardo",
    "handle": "@jian7",
    "bio": "Creador de contenido..."
  },
  "links": [
    {
      "id": "1",
      "platform": "instagram",
      "label": "Instagram",
      "sub": "Sígueme en Instagram",
      "url": "https://instagram.com/tuusuario",
      "visible": true
    }
  ]
}
```

---

## Plataformas soportadas

Instagram · Facebook · YouTube · TikTok · Twitter/X · WhatsApp · LinkedIn · Twitch · Spotify · GitHub · Sitio web genérico

---

## Funcionalidades del admin

- **Agregar links** con selector visual de plataforma (11 opciones)
- **Editar** etiqueta, subtítulo y URL de cada link
- **Mostrar / ocultar** links con toggle sin eliminarlos
- **Reordenar** con drag & drop
- **Eliminar** con confirmación
- **Editar perfil**: avatar (16 emojis), nombre, handle y bio
- **Preview en vivo** en mockup de teléfono — se actualiza al instante
- **Guardar**: persiste en localStorage, sobrevive recargas

---

## Decisiones de arquitectura

**Sin Redux / Zustand**: el estado es simple y local al usuario, Context API es suficiente.

**Sin iframe en el preview**: `<PublicPage>` se renderiza directamente escalado con CSS `transform`. Más simple y con actualización instantánea.

**localStorage como backend**: el MVP no necesita servidor. Si en el futuro se quiere multi-usuario o persistencia en la nube, reemplazar las llamadas a `localStorage` en `StoreContext.jsx` por llamadas a una API.

**Sin librería de íconos**: los SVG de cada plataforma están inline en `platforms.jsx`. Evita dependencias externas y permite control total del color y tamaño.

---

## Próximos pasos sugeridos

- [ ] Agregar autenticación para proteger `/admin`
- [ ] Backend con base de datos (Supabase / PlanetScale)
- [ ] URLs personalizadas por usuario (`/jian7`)
- [ ] Analytics de clicks por link
- [ ] Más temas visuales (claro, minimal, neón)
- [ ] Soporte para imágenes en el avatar
