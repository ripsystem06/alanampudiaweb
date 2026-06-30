# SDD Full Spec — trophy-truck-specs (modificado)

## STATUS

`active` · Scoped to `EnPista.jsx` · Reemplazo de 6 tablas por specs genéricas + tarjetas interactivas.

---

## EXECUTIVE SUMMARY

Las 6 tablas técnicas del Trophy Truck (motor, suspensión, transmisión, etc.) se reemplazan por 3-4 specs genéricas resumidas y un botón "Más información" que despliega tarjetas informacionales tipo accordion/toggle. Los datos específicos permanecen disponibles bajo request pero no se exhiben en la interfaz pública.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| TTS-01 | Las 6 tablas técnicas existentes DEBERÁN ser removidas del render | SHALL |
| TTS-02 | El contenido DEBERÁ mostrarse como 3-4 specs genéricas con título y valor | SHALL |
| TTS-03 | Un botón "Más información" DEBERÁ expandir un accordion con tarjetas detalladas | SHALL |
| TTS-04 | Las tarjetas del accordion DEBERÁN usar `<details>`/`<summary>` o toggle similar | SHALL |
| TTS-05 | Las specs genéricas DEBERÁN incluir: Potencia, Torque, Peso, Categoría | SHALL |
| TTS-06 | Los datos específicos (ex: "560 hp", "480 lb-ft") NO DEBERÁN aparecer en el layout principal | SHALL |
| TTS-07 | La sección DEBE ser responsive: cards en columna en mobile, grid en desktop | SHALL |

---

## ESCENARIO: Trophy Truck Specs cerrado (default)

**Given** el usuario está en la página EnPista, sección Trophy Truck  
**When** la página carga  
**Then** se muestran 4 specs genéricas (Potencia, Torque, Peso, Categoría) con valores resumidos y un botón "Más información" colapsado  

---

## ESCENARIO: Trophy Truck Specs expandido

**Given** el usuario hizo click en "Más información"  
**When** el accordion se expande  
**Then** aparecen tarjetas con detalles adicionales: Motor, Suspensión, Transmisión, Frenos, etc.  

---

## ESCENARIO: Trophy Truck Mobile

**Given** el usuario ve EnPista en mobile (<768px)  
**When** la sección Trophy Truck carga  
**Then** las specs genéricas se muestran en columna única, el accordion funciona con tap, tarjetas se apilan verticalmente  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Accordion abierto cuando se hace scroll hacia abajo | `scrollIntoView({ behavior: 'smooth' })` opcional; no requerido |
| 2 | Contenido del accordion muy largo | Cada tarjeta es independent `<details>`; scroll interno no deseado |
| 3 | Toggle rápido (abrir/cerrar repetidamente) | CSS transitions con `auto` requieren height animado via JS o max-height hack |
| 4 | Traducción EN de specs genéricas | Keys `enpista.tts_potencia`, `enpista.tts_torque`, `enpista.tts_peso`, `enpista.tts_categoria` |
| 5 | Botón "Más información" ya clickeado en sesión | Estado local del componente maneja `isOpen`; no persiste en localStorage |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Página | `src/pages/EnPista.jsx` | Remover 6 tablas, agregar specs + accordion |
| Traducciones | `src/i18n/translations.js` | Keys para specs genéricas y labels del accordion |

---

## NEXT_RECOMMENDED

1. **Verificar** que las 6 tablas fueron completamente removidas (grep para `table`, `td`, `tr` en sección Trophy)
2. **Snapshot visual**: capturar specs genéricas + accordion expandido en ambos viewports
3. **Accesibilidad**: `aria-expanded` en el toggle, `aria-controls` apunta al contenido

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Datos técnicos específicos aún visibles en código fuente | Medium | Low | Los datos específicos se mantienen en comments o array separado; no en DOM visible |
| Accordion con `auto` height no anima suavemente en Safari | Low | Low | Usar pattern `grid-template-rows: 0fr / 1fr` para animaciones nativas |
