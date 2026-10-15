# CLAUDE.md — Panel de contenido

Panel de control para la gestión de contenido de EDMA Connect. Por ahora es solo
el esqueleto: cinco secciones con páginas de marcador de posición y una barra
lateral compartida. Todo el texto visible está en español.

## Pila tecnológica

| Pieza | Versión | Notas |
|---|---|---|
| Next.js (App Router) | 15.5 | `src/app`, componentes de servidor por defecto |
| React | 19.1 | |
| TypeScript | 5, modo `strict` | alias `@/*` → `src/*` |
| Tailwind CSS | 4 | configuración en CSS (`@theme` en `globals.css`), sin `tailwind.config` |
| shadcn/ui | estilo `new-york`, color base `neutral` | ver `components.json` |
| Radix UI | `react-slot`, `react-separator`, `react-dialog` | primitivas usadas por shadcn |
| lucide-react | | iconos |
| tw-animate-css | | animaciones de shadcn (Sheet) |
| geist | | fuentes Geist Sans/Mono servidas desde npm |
| ESLint 9 | `eslint-config-next` | `npm run lint` |

Comandos: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.

## Estructura de carpetas

```
panel/
├── CLAUDE.md
├── components.json            # configuración de shadcn/ui
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind + variables de color de shadcn (claro y oscuro)
│   │   ├── layout.tsx         # layout raíz: tema oscuro, barra lateral, menú móvil
│   │   ├── page.tsx           # portada: tarjetas que enlazan a cada sección
│   │   ├── instagram/page.tsx     # Administrador de Instagram
│   │   ├── analisis/page.tsx      # Análisis
│   │   ├── calendario/page.tsx    # Calendario de contenido
│   │   ├── competencia/page.tsx   # Seguimiento de la competencia
│   │   └── noticias/page.tsx      # Consolidador de noticias
│   ├── components/
│   │   ├── ui/                # componentes de shadcn/ui
│   │   └── layout/            # piezas propias del armazón del panel
│   │       ├── app-sidebar.tsx         # barra lateral fija (md+)
│   │       ├── mobile-nav.tsx          # cabecera + Sheet con el menú (< md)
│   │       ├── nav-links.tsx           # enlaces con estado activo (cliente)
│   │       ├── brand.tsx               # logo/nombre del panel
│   │       ├── page-header.tsx         # título + descripción + icono de cada página
│   │       └── section-placeholder.tsx # contenido de marcador de posición
│   ├── config/
│   │   └── nav.ts             # ÚNICA lista de secciones (título, ruta, icono, descripción)
│   └── lib/
│       └── utils.ts           # cn() = clsx + tailwind-merge
```

## Convenciones de componentes

- **Secciones:** `src/config/nav.ts` es la fuente de verdad. La barra lateral, el
  menú móvil, la portada y los marcadores de posición leen de ahí. Para añadir una
  sección: añadir una entrada en `navItems` y crear `src/app/<ruta>/page.tsx`.
- **Rutas en español y sin tildes** (`/analisis`, `/calendario`, `/competencia`,
  `/noticias`); `/instagram` es nombre propio.
- **`src/components/ui/`** contiene solo componentes de shadcn/ui. Se añaden con
  `npx shadcn@latest add <componente>` y se usan tal cual; para cambiar su aspecto
  se pasa `className` en lugar de editar el archivo.
- **`src/components/layout/`** contiene el armazón propio. Los componentes de una
  sección concreta irán en `src/components/<seccion>/` (por ejemplo
  `src/components/calendario/`) cuando hagan falta.
- **Servidor por defecto.** `"use client"` solo donde hay estado o hooks del
  navegador (hoy: `nav-links.tsx`, `mobile-nav.tsx` y los componentes de shadcn
  que lo traen).
- **Estilos:** solo clases de Tailwind con los tokens semánticos de shadcn
  (`bg-background`, `text-muted-foreground`, `bg-sidebar`, `border`…), nunca
  colores fijos como `bg-zinc-900`, para que el tema se controle desde
  `globals.css`. Las clases se combinan con `cn()`.
- **Componentes como funciones con nombre** y exportación nombrada; las páginas
  usan `export default`. Archivos en `kebab-case.tsx`.
- **Páginas de marcador de posición:** usan `<SectionPlaceholder href="/ruta"
  upcoming={[...]} />`. Cuando una sección tenga contenido real, su `page.tsx`
  deja de usarlo y usa `<PageHeader>` directamente.

## Decisiones tomadas durante la configuración

1. **Ubicación:** el panel vive en la carpeta `panel/` del repositorio
   `edmaconnect-fotos`, separado de las fotos y reels que ya había, para no
   mezclar dependencias de Node con los recursos de imagen.
2. **Tema oscuro fijo:** la clase `dark` está puesta directamente en `<html>` en
   `layout.tsx`. No hay `next-themes` ni selector de tema. La paleta clara de
   shadcn se conserva en `:root` por si en el futuro se quiere un modo claro.
3. **shadcn/ui instalado a mano:** el entorno donde se creó el proyecto no podía
   acceder a `ui.shadcn.com`, así que `npx shadcn init/add` falló. Se creó
   `components.json` y se escribieron los componentes (`button`, `card`, `badge`,
   `separator`, `sheet`) con el código del estilo `new-york` para Tailwind 4. Desde
   un equipo con internet normal, `npx shadcn@latest add <componente>` funciona
   sobre esta configuración (puede pedir sobrescribir esos cinco; es seguro).
4. **Barra lateral propia y sencilla** en lugar del componente `Sidebar` de
   shadcn (que es grande y trae colapsado, cookies y atajos). Usa los mismos
   tokens `--sidebar-*`, así que se puede cambiar por el oficial más adelante sin
   tocar colores. En móvil se muestra como `Sheet` desde la izquierda.
5. **Fuentes desde el paquete `geist`** en vez de `next/font/google`, para que la
   compilación no dependa de descargar de Google Fonts.
6. **Next.js 15 con Webpack** (sin `--turbopack`) para una compilación estable.
7. **Todas las páginas son estáticas** por ahora: no hay base de datos, API ni
   autenticación. Esas decisiones quedan pendientes para cuando cada sección
   tenga funcionalidad real.
