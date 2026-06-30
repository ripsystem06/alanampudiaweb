# SDD Full Spec — race-records (modificado)

## STATUS

`active` · Scoped to `EnPista.jsx` · Modificación de datos exhibidos.

---

## EXECUTIVE SUMMARY

Los records de carrera en EnPista cambian su display: se elimina el posicionamiento absoluto (número grande en la esquina) y se muestra texto "2 Campeonatos Mundiales" como encabezado de la sección. El formato de lista de logros se mantiene pero sin la cifra grande como foco visual.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| RCR-01 | La frase "2 Campeonatos Mundiales" DEBE mostrarse como texto visible | SHALL |
| RCR-02 | El número "2" NO DEBE estar en posición absoluta con `position: absolute` | SHALL |
| RCR-03 | La lista de logros previos DEBE mantenerse con sus traducciones | SHALL |
| RCR-04 | El estilo visual DEBE integrar el texto "2 Campeonatos" como heading de la sección | SHALL |
| RCR-05 | El diseño DEBE ser consistente en mobile y desktop | SHALL |

---

## ESCENARIO: Race Records Desktop

**Given** el usuario está en la página EnPista, sección Records  
**When** la página carga o hace scroll  
**Then** se muestra "2 Campeonatos Mundiales" como título, seguido de lista de logros; sin números absolutos en corners  

---

## ESCENARIO: Race Records Mobile

**Given** el usuario ve EnPista en mobile (<768px)  
**When** la sección Records entra en viewport  
**Then** "2 Campeonatos Mundiales" aparece como heading, lista de logros en columna única, layout sin overflow horizontal  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Traducción EN muestra "2 World Championships" | Key `enpista.records_2_campeones` debe existir en translations.js |
| 2 | Más records agregados en el futuro | Lista es array; agregar items sin cambiar estructura del componente |
| 3 | Records de 2025 disponibles | Agregar al array sin modificar el heading "2 Campeonatos" (sigue siendo exacto) |
| 4 | Viewport muy angosto (320px) | `text-overflow: ellipsis` en items largos; no romper layout |
| 5 | Número "2" persiste en el DOM como vestigio | Búsqueda con grep en `src/pages/EnPista.jsx` para `position: absolute` antes de commit |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Página | `src/pages/EnPista.jsx` | Remover `position: absolute` del número 2, integrar como heading |
| Traducciones | `src/i18n/translations.js` | Nueva key `enpista.records_2_campeones` |

---

## NEXT_RECOMMENDED

1. **Verificar** con grep que no queda `position: absolute` relacionado al record
2. **Snapshot visual**: capturar desktop y mobile de la sección records
3. **Verificar** que la traducción EN funciona

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Número "2" tetap bunyi di DOM sin estilo visible | Low | Low | Revisión manual del componente post-cambio |
| Hardcoded "2" en vez de traducción | Low | Medium | Usar `t('enpista.records_2_campeones')` en vez de texto fijo |
