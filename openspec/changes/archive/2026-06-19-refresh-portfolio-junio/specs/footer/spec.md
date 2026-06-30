# SDD Full Spec — footer (modificado)

## STATUS

`active` · Scoped to `Footer.jsx` · Cambio visual completo.

---

## EXECUTIVE SUMMARY

El Footer se rediseña con: fondo negro sólido (`#000`), outline magenta (`2px solid #E91E8C`) alrededor del contenedor, watermark del logo Alan Ampudia opacity 0.08 al fondo, y se reorganizan las firmas/rubrics. La estructura de links se mantiene idéntica.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| FTR-01 | El contenedor del Footer DEBE tener `background-color: #000` | SHALL |
| FTR-02 | El Footer DEBE tener `border: 2px solid #E91E8C` (outline magenta) | SHALL |
| FTR-03 | El logo watermark DEBE estar centrado como imagen de fondo con `opacity: 0.08` | SHALL |
| FTR-04 | Los links existentes (RS, Legal, etc.) DEBEN conservarse sin cambios en su contenido | SHALL |
| FTR-05 | La tipografía del Footer DEBE usar `font-family: 'Permanent Marker'` para títulos y `sans-serif` para body | SHALL |
| FTR-06 | El Footer DEBE ser `position: relative` para que el watermark absolute funcione | SHALL |
| FTR-07 | La sección de firmas/rubrics DEBE aparecer debajo de los links principales | SHALL |

---

## ESCENARIO: Footer Desktop

**Given** el usuario está en cualquier página al hacer scroll hasta el final  
**When** el Footer entra en viewport  
**Then** se muestra fondo negro con borde magenta visible, logo watermark sutil al fondo, y links organizados en columnas  

---

## ESCENARIO: Footer Mobile

**Given** el usuario ve el sitio en viewport < 768px  
**When** hace scroll hasta el Footer  
**Then** los links se muestran en columna única, el watermark se escala proporcionalmente (max-width: 80%), borde magenta se mantiene  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Contenido del Footer excede altura del viewport en mobile | `min-height: 100vh` con flex column distribution; scroll interno no deseado |
| 2 | Logo watermark con resolución baja | Usar SVG o WebP con `background-size: contain` para evitar pixelado |
| 3 | Links de redes sociales con íconos | Los íconos mantienen color actual; outline magenta no los afecta |
| 4 | Texto de Copyright demasiado largo | `text-overflow: ellipsis` con `max-width: 100%`; no romper layout |
| 5 | Breakpoint exacto 768px | CSS usa `(min-width: 768px)` para desktop, sin cambios en móvil |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Componente | `src/components/Footer.jsx` | Actualizar estilos inline/CSS modules con nuevo schema |
| Estilos | `src/components/Footer.css` | Outline magenta, fondo negro, watermark |

---

## NEXT_RECOMMENDED

1. **Verificar** que el logo watermark se ve sutil y no compite con los links
2. **Snapshot visual**: capturar viewport 375px y 1440px del Footer
3. **Accesibilidad**: contrast ratio del texto sobre fondo negro debe pasar WCAG AA

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Outline magenta genera scroll horizontal en mobile | Low | Medium | `box-sizing: border-box` + `overflow-x: hidden` en wrapper |
| Watermark restado con texto sobre él | Low | Low | `pointer-events: none` en el watermark; z-index分层 |
