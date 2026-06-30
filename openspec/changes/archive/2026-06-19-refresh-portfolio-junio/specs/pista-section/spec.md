# SDD Full Spec — pista-section (modificado)

## STATUS

`active` · Scoped to `PistaSection.jsx` · Responsive invert + animaciones.

---

## EXECUTIVE SUMMARY

La sección Pista de EnPista modifica su layout responsive: en mobile (<768px) el texto aparece encima de la imagen (orden invertido vs. desktop). Se agregan animaciones de entrada GSAP + ScrollTrigger para ambos elementos (texto y imagen).

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| PSI-01 | En desktop (≥768px) el layout DEBE ser imagen a la izquierda, texto a la derecha | SHALL |
| PSI-02 | En mobile (<768px) el layout DEBE ser texto encima, imagen debajo (orden invertido) | SHALL |
| PSI-03 | La animación de entrada del texto DEBE usar GSAP + ScrollTrigger: `opacity 0→1` + `translateY(40px→0)` | SHALL |
| PSI-04 | La animación de entrada de la imagen DEBE usar GSAP + ScrollTrigger: `opacity 0→1` + `translateX(-50px→0)` (desktop) / `translateY(40px→0)` (mobile) | SHALL |
| PSI-05 | Las animaciones DEBEN activarse cuando el 20% del elemento entra en viewport | SHALL |
| PSI-06 | El breakpoint de inversión DEBE ser `window.innerWidth < 768` | SHALL |

---

## ESCENARIO: PistaSection Desktop

**Given** el usuario ve la página EnPista en desktop (≥768px)  
**When** hace scroll y la sección Pista entra en viewport  
**Then** la imagen aparece desde la izquierda con slide + fade, seguido del texto desde la derecha con fade + slide up  

---

## ESCENARIO: PistaSection Mobile

**Given** el usuario ve la página EnPista en mobile (<768px, viewport 375px)  
**When** hace scroll y la sección Pista entra en viewport  
**Then** el texto aparece primero (slide up + fade), luego la imagen aparece debajo (slide up + fade)  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Scroll rápido hacia la sección | GSAP timeline con `toggleActions: 'play none none none'` evita re-play |
| 2 | Viewport exactamente en 768px | CSS usa `min-width: 768px` para desktop; comportamiento desktop |
| 3 | Imagen no carga | Placeholder con `background-color: #1a1a1a` y ícono de imagen rota |
| 4 | Texto con tildes o caracteres especiales | UTF-8 encoding garantizado; sin cambios en el spec |
| 5 | Animación interrumpe touch scroll en iOS | `will-change: transform` solo en elementos animados; evitar `translateZ(0)` global |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Componente | `src/components/PistaSection.jsx` | Agregar lógica responsive order + GSAP animations |
| Estilos | `src/components/PistaSection.css` | Flexbox con `flex-direction` condicionada |

---

## NEXT_RECOMMENDED

1. **Verificar** con Playwright en viewport 375px que texto aparece encima de imagen
2. **Verificar** que las animaciones no se repiten al hacer scroll hacia arriba y volver
3. **Snapshot visual**: capturar secuencia de animación con scroll

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Breakpoint JS `window.innerWidth` difiere del CSS media query | Low | Medium | Usar mismo valor (768px) en ambos; verificar con DevTools |
| GSAP ScrollTrigger interfiere con IntersectionObserver de otras secciones | Low | Low | Cada componente maneja su propio trigger; no compartir instances |
