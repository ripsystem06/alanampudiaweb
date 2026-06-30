# SDD Full Spec — team-data (modificado)

## STATUS

`active` · Scoped to `EnPista.jsx` · Limpieza de stats técnicos de Kyle Craft.

---

## EXECUTIVE SUMMARY

Los datos del equipo en EnPista se simplifican: se renombra "Kyle Craft" a "Kyle Craft" (sin cambios de nombre), se limpian los stats técnicos excesivos (números de specs, tiempos,metricas granulares), y se muestra una versión minimalista con información relevante para fans. Los stats técnicos permanecen disponibles bajo request.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| TDM-01 | El nombre del corredor DEBE mostrarse como "Kyle Craft" | SHALL |
| TDM-02 | Los stats técnicos excesivos (tiempos de vuelta, métricas de telemetria) DEBERÁN ser removidos | SHALL |
| TDM-03 | La información básica DEBERÁ mostrarse: equipo, número de corredor, categoría | SHALL |
| TDM-04 | El layout DEBE ser consistente en mobile y desktop | SHALL |
| TDM-05 | Los stats originales DEBERÁN mantenerse en comments para referencia futura | SHALL |

---

## ESCENARIO: Team Data Desktop

**Given** el usuario está en EnPista, sección Equipo  
**When** la página carga  
**Then** se muestra "Kyle Craft" con equipo, número y categoría en formato limpio, sin métricas técnicas  

---

## ESCENARIO: Team Data Mobile

**Given** el usuario ve EnPista en mobile (<768px)  
**When** hace scroll hasta la sección Equipo  
**Then** la información se muestra en columna única, tipografía legible, sin overflow horizontal  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Stats en idioma EN | Keys `enpista.team_kylecraft_*` deben existir |
| 2 | Más adelante se necesitan stats técnicos | Los comments en código permiten reconstruir; crear issue para feature request |
| 3 | Número de corredor cambia | Actualizar solo el valor en el objeto data; no requiere cambio de estructura |
| 4 | Foto de perfil no carga | Placeholder con iniciales "KC" y background color de la marca |
| 5 | Más integrantes de equipo agregados en el futuro | Array de `teamMembers[]` permite expansión sin cambio de componente |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Página | `src/pages/EnPista.jsx` | Simplificar datos de Kyle Craft, limpiar stats técnicos |
| Traducciones | `src/i18n/translations.js` | Keys `enpista.team_kylecraft_*` para labels |

---

## NEXT_RECOMMENDED

1. **Verificar** con grep que los stats técnicos no persisten en el DOM
2. **Snapshot visual**: capturar desktop y mobile de la sección equipo
3. **Verificar** que los comments con datos originales están presentes para referencia

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Stats técnicos eliminados son requeridos por stakeholders | Low | Medium | Comments preservan datos; issue en Jira para solicitar feature |
| Renombrado accidental de otros miembros del equipo | Low | Low | Verificar que solo "Kyle Craft" fue modificado |
