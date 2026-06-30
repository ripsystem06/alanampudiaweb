# SDD Full Spec — video-socials-block (nuevo)

## STATUS

`active` · Extraído de `FueraDePista.jsx` · Componente compartido.

---

## EXECUTIVE SUMMARY

Nuevo componente `VideoSocialsBlock` que combina un iframe de YouTube (video embed) con un grid de 3×3 miniaturas de Instagram. Será reutilizable en `Home` (post-Patrocinadores) y `EnPista` (pre-Footer). No requiere dependencias nuevas.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| VSB-01 | El componente DEBE renderizar un iframe de YouTube con título accessible | SHALL |
| VSB-02 | El componente DEBE mostrar un grid de 9 miniaturas de Instagram (3×3) | SHALL |
| VSB-03 | El iframe YouTube DEBE usar `loading="lazy"` | MUST |
| VSB-04 | Las miniaturas de Instagram DEBEN abrir link en nueva pestaña | SHALL |
| VSB-05 | El layout DEBE ser responsive: columna única en mobile (<768px), lado a lado en desktop (≥768px) | SHALL |
| VSB-06 | El componente DEBE aceptar props `videoId` (YouTube) e `instagramLinks` (array 9 items) | SHALL |
| VSB-07 | El fallback visual cuando no hay video DEBE mostrar placeholder con ícono de play | SHALL |

---

## ESCENARIO: YouTube + Instagram en Home

**Given** el usuario está en la página Home después de la sección Patrocinadores  
**When** la página carga completamente  
**Then** el componente `VideoSocialsBlock` muestra el iframe YouTube a la izquierda y el grid Instagram a la derecha (desktop) o apilado verticalmente (mobile)  

---

## ESCENARIO: VideoSocialsBlock en EnPista

**Given** el usuario está en la página EnPista antes del Footer  
**When** ScrollTrigger activa la entrada del bloque  
**Then** el componente aparece con fade-in + translateY(30px→0), el iframe YouTube reproduce el video de la última carrera  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | `videoId` es `null` o `undefined` | Renderizar placeholder con mensaje "Video próximamente" e ícono play deshabilitado |
| 2 | Array `instagramLinks` tiene menos de 9 items | Renderizar solo los items disponibles; grid se completa con placeholders vacíos (border dashed) |
| 3 | URL de Instagram inválida | La miniatura muestra fallback image; link abre `https://instagram.com/alanampudia` como default |
| 4 | YouTube iframe bloqueado por adblocker | Contenedor muestra mensaje "Activa JavaScript para ver el video" en lugar del iframe |
| 5 | Mobile touch en miniaturas Instagram | `tap-highlight-color: transparent` para evitar flash azul en iOS |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Componente nuevo | `src/components/VideoSocialsBlock.jsx` | Crear desde cero |
| Uso en Home | `src/pages/Home.jsx` | Insertar post-Patrocinadores |
| Uso en EnPista | `src/pages/EnPista.jsx` | Insertar pre-Footer |
| Estilos | `src/components/VideoSocialsBlock.css` | CSS module o inline styles |

---

## NEXT_RECOMMENDED

1. **Verificar** que el videoId de YouTube corresponde al último video subido al canal
2. **Verificar** que los 9 links de Instagram funcionan y apuntan a posts reales
3. **Snapshot visual**: capturar viewport 375px y 1440px para validar responsividad

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Videos de Instagram o YouTube eliminados en el futuro | Medium | Low | Los links se actualizan en el CMS o hardcoded; placeholder previene broken layout |
| iframe YouTube afecta Lighthouse performance | Low | Low | `loading="lazy"` + `title` accessible mejora score |
