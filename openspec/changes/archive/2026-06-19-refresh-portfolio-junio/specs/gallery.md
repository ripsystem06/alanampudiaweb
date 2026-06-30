# SDD Delta Spec — Galería: refresh-portfolio-junio

## STATUS

`active` · Scoped to `GallerySection.jsx` · Solo esta sección del proposal.

---

## EXECUTIVE SUMMARY

La sección Galería exhibe actualmente 19 imágenes intercaladas con 10 frases de traducción (`home.gallery_polvo` a `home.gallery_polvo2`). El cambio elimina las frases, reutiliza las 19 imágenes existentes, y conserva únicamente la animación de entrada por scroll. Las traducciones se marcan como inactivas en `translations.js` — no se borran.

---

## ESCENARIO: BEFORE (estado actual)

### Layout
- **Mobile** (<768px): CSS `columns: 2` con `column-gap: 0.8rem` — masonry de papel.
- **Desktop** (≥768px): CSS Grid 6 columnas, `grid-auto-rows: 120px`, `grid-auto-flow: dense`, `gap: 1.6rem`.
- Cada imagen tiene tamaño variante (`gc-1-1` a `gc-3-2`) definido por el array `spans[]` rotativo.

### Phrases intercaladas
- Se insertan 10 frases como cards de tipo `phrase` cada 4 imágenes.
- Las frases usan la key de traducción (`home.gallery_polvo` … `home.gallery_polvo2`).
- Phrases renderizan con `Permanent Marker` font, `font-size: 13px` mobile / `clamp(16px, 1.8vw, 20px)` desktop.
- Si el array de imágenes produce más de 10 grupos de 4, las frases se repiten desde el inicio.

### Animación
- `IntersectionObserver` con `threshold: 0.1`, `rootMargin: '0px 0px -40px 0px'`.
- Cada `.gallery-card` recibe `.revealed` al entrar en viewport: `opacity 0→1` + `translateX(50px→0)` (mobile) / `translateX(60px→0)` (desktop).

### Imágenes
- 19 archivos en `/images/galeria1/`: `01-alan-portrait.webp` … `10-victory-flag.webp` + 3 BAJA400 + 3 BAJA500 + 4 SanFelipe250.
- `filter: saturate(0.8) contrast(1.05)` + overlay rosa `mix-blend-mode: multiply` al 20%.

### Estilo visual de las cards
- Borde: `1px solid rgba(233,30,99,0.12)`.
- `aspect-ratio: 3/4` por defecto.
- Variantes de tamaño `gc-*` aplican `aspect-ratio` y grid spans en desktop.

---

## ESCENARIO: AFTER (estado deseado)

### Layout
- **Sin cambios en la estructura grid columns/grid**: se conserva CSS Grid 6 columnas en desktop y `columns: 2` en mobile.
- Los 19 imágenes se redistribuyen usando los mismos tamaños variantes (`spans[]`) sin inserciones de frases.
- El array `items` se genera directamente del array `allImages` sin lógica de intercalado de frases.

### Phrases removidas
- Se elimina la construcción del array `phrases` y toda lógica de intercalado (`if ((i + 1) % 4 === 0 ...)`).
- El div renderizado para cada frase (`type === 'phrase'`) desaparece del código.
- El map en JSX ya no necesita bifurcación por tipo.

### Animación de entrada
- Se conserva el `IntersectionObserver` con `.gallery-card.revealed`.
- Solo se anima sobre elementos de tipo imagen; sin cambios en timing ni easing.

### Traducciones
- Las 10 keys `home.gallery_polvo` … `home.gallery_polvo2` permanecen en `translations.js` con sus valores actuales.
- Se marcan como inactivas agregando comentario `// INACTIVE (refresh-portfolio-junio)` o flag equivalente que impida su uso sin borrarlas.
- La prop `t()` deja de invocarse para estas keys en este componente.

### Imágenes
- Sin cambios: las 19 imágenes se reutilizan tal como están en `/images/galeria1/`.

---

## edge CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Una frase es el último item del array `items` | El código actual ya hace `pop()` si el último item es frase; se mantiene este comportamiento o se elimina la rama de frase por completo, eliminando la necesidad del pop. |
| 2 | Más de 40 imágenes en el futuro | Sin frases intercaladas, no hay lógica de repetición; el array `spans[]` sigue haciendo rotate infinito sin efectos colaterales. |
| 3 | Idioma EN con frases inactivas | El componente no llama `t()` para ninguna frase; el contexto de idioma no afecta esta sección. |
| 4 | Imágenes con rutas relativas rotas | La remoción de frases no modifica los `src` de las imágenes; se conserva el mismo comportamiento de carga. |
| 5 | Breakpoint 768px exacto | El CSS usa `@media (min-width: 768px)` — sin cambios en este spec. |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Componente Galería | `src/components/GallerySection.jsx` | Eliminar lógica phrases, array `phrases[]`, condicional intercalado, rama JSX phrase. |
| Traducciones | `src/i18n/translations.js` | Marcar `home.gallery_polvo` … `home.gallery_polvo2` como inactivas (comentario, no borrar). |

---

## NEXT_RECOMMENDED

1. **Verificar** que ninguna otra sección del codebase importa o usa las keys `home.gallery_*`.
2. **Linting**: correr `pnpm build` tras el cambio para confirmar zero errores.
3. **Snapshot visual**: capturar screenshot de la galería en viewport 375px (mobile) y 1440px (desktop) antes/después.

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Las frases contribuían al SEO textual de la página (contenido `alt` vacío en imágenes) | Low | Low | Las keys de traducción se conservan inactivas; el contenido de las images sigue disponible. |
| Redistribución de imágenes sin frases deja huecos visuales inesperados | Low | Medium | Usar los mismos `spans[]` existentes garantiza variación de tamaños; si el resultado no es satisfactorio, se ajusta `spans[]` en el mismo commit. |
| El flag de inactividad en translations.js se pierde en un future cleanup | Low | Low | El comentario `// INACTIVE (refresh-portfolio-junio)` es visible; documentar en el spec que estas keys no deben borrarse. |
