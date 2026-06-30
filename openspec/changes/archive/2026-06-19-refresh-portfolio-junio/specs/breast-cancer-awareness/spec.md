# SDD Full Spec — breast-cancer-awareness (modificado)

## STATUS

`active` · Scoped to `FueraDePista.jsx` · Contenido sensible actualizado.

---

## EXECUTIVE SUMMARY

La sección de cáncer de mama en FueraDePista se actualiza: nuevo texto explicativo, logo/corporate insignia cambiado (usar el de la campaña actual 2024-2025), y se agregan 2 cards placeholder para futuras secciones de bingo y golf con `data-placeholder="true"`. La sección Filosofía (3 cards) se elimina.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| BCA-01 | El texto principal DEBE mencionar la campaña 2024-2025 con link a organización oficial | SHALL |
| BCA-02 | El logo DEBE ser el de la campaña actual (no el 2023) | SHALL |
| BCA-03 | La card de "Bingo" DEBE tener `data-placeholder="true"` y texto "Bingo: proximamente" | SHALL |
| BCA-04 | La card de "Golf" DEBE tener `data-placeholder="true"` y texto "Golf: proximamente" | SHALL |
| BCA-05 | Las cards placeholder NO DEBEN tener links funcionales | SHALL |
| BCA-06 | El quote de México DEBE mantenerse sin cambios | SHALL |
| BCA-07 | La sección Filosofía (3 cards) DEBE estar eliminada del render | SHALL |

---

## ESCENARIO: Breast Cancer Section Desktop

**Given** el usuario está en FueraDePista, sección Cancer de Mama  
**When** la página carga  
**Then** muestra logo actualizado, texto 2024-2025, 2 cards placeholder con borde dashed, quote México intacto  

---

## ESCENARIO: Breast Cancer Section Mobile

**Given** el usuario ve FueraDePista en mobile (<768px)  
**When** hace scroll hasta la sección Cancer de Mama  
**Then** las cards se apilan verticalmente, placeholder cards mantienen `data-placeholder="true"`  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Cards placeholder reciben click | `onClick` con `e.preventDefault()`; cursor `not-allowed` |
| 2 | Logo de campaña no está disponible aún | Usar placeholder con texto "Logo cáncer de mama 2024-2025" y comment en código |
| 3 | Traducciones EN no actualizadas | Crear keys `fuera.cancer_*` nuevas; keys viejas se marcan inactivas |
| 4 | Más de 2 cards placeholder necesarias en el futuro | Estructura permite array expansion; ninguna lógica adicional requerida |
| 5 | ScrollTrigger interfiere con animaciones existentes | No agregar animaciones GSAP a esta sección; mantener simple fade-in |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Página | `src/pages/FueraDePista.jsx` | Actualizar texto, logo, agregar cards placeholder, remover Filosofía |
| Traducciones | `src/i18n/translations.js` | Nuevas keys `fuera.cancer_*`; marcar viejas inactivas |

---

## NEXT_RECOMMENDED

1. **Verificar** que link de organización de cáncer de mama es real y accesible
2. **Verificar** que placeholder cards no responden a clicks
3. **Snapshot visual**: capturar desktop y mobile de la sección actualizada

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Contenido sensible (cáncer) con información incorrecta | Low | High | Revisar con equipo de marketing antes de merge |
| Placeholder cards confunden a usuarios creyendo que son clickeables | Medium | Low | CSS `cursor: not-allowed` + aria-label "Próximamente" |
