# SDD Full Spec — translations (modificado)

## STATUS

`active` · Scoped to `src/i18n/translations.js` · Limpieza de keys huérfanas.

---

## EXECUTIVE SUMMARY

Se limpian las traducciones asociadas a secciones removidas o modificadas. Las keys huérfanas (que ya no se usan en ningún componente) se marcan con comentario `// INACTIVE (refresh-portfolio-junio)` en lugar de borrarse. Las keys de nuevas secciones (video-socials-block, breast-cancer-awareness) se crean según necesidad de los specs correspondientes.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| TRN-01 | Las keys `home.gallery_polvo` a `home.gallery_polvo2` DEBERÁN marcarse como inactivas | SHALL |
| TRN-02 | La key `fuera.filosofia_*` (3 cards) DEBERÁ marcarse como inactiva | SHALL |
| TRN-03 | Keys asociadas a HelmetScroll DEBERÁN marcarse como inactivas si existen | SHALL |
| TRN-04 | Las keys de nuevas secciones DEBERÁN crearse según los specs de cada capability | SHALL |
| TRN-05 | NINGUNA key DEBERÁ ser borrada físicamente del archivo translations.js | SHALL |
| TRN-06 | El comentario `// INACTIVE (refresh-portfolio-junio)` DEBERÁ ser el indicador de inactividad | SHALL |

---

## ESCENARIO: translations.js Post-Limpieza

**Given** el archivo `translations.js` después de aplicar todos los specs  
**When** se abre el archivo  
**Then** las keys inactivas tienen comentario `// INACTIVE (refresh-portfolio-junio)`; keys activas no tienen comentario; estructura del archivo se mantiene  

---

## ESCENARIO: Nueva Key Creada

**Given** un componente nuevo o modificado necesita una traducción  
**When** el developer implementa el spec  
**Then** la key对应的 `es` y `en` se crean en el objeto translations.js sin comentario de inactividad  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | Una key marcada inactiva se usa accidentalmente en un componente | El valor existe en el archivo; no genera error; pero la UI no la usa porque el componente no la llama |
| 2 | Múltiples cambios en el futuro marcan keys como inactivas | Cada cambio agrega su propio comment `// INACTIVE (nombre-del-cambio)`; no se sobreescribe |
| 3 | Un componente nuevo usa una key que se había marcado inactiva previamente | Eliminar el comment de inactividad; la key vuelve a estar activa |
| 4 | translations.js tiene merge conflicts en el futuro | Las keys inactivas con comments facilitan resolver conflictos de forma segura |
| 5 | Traducción EN para nueva key no existe | Usar valor de `es` como fallback temporalmente; crear issue para traducir |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Traducciones | `src/i18n/translations.js` | Agregar comentario `// INACTIVE (refresh-portfolio-junio)` a keys huérfanas |
| Keys nuevas | `src/i18n/translations.js` | Crear según specs: video-socials-block, breast-cancer-awareness, race-records, trophy-truck-specs, team-data |

---

## KEYS A MARCAR COMO INACTIVAS

| Key | Razón de inactividad |
|-----|---------------------|
| `home.gallery_polvo` … `home.gallery_polvo2` (10 keys) | Galería sin frases (gallery spec) |
| `fuera.filosofia_*` (3 keys) | Sección Filosofía eliminada (breast-cancer-awareness spec) |
| `enpista.helmet_*` (si existen) | HelmetScroll removido (helmet-animation spec) |

---

## KEYS NUEVAS A CREAR

| Key | Spec que la requiere |
|-----|---------------------|
| `home.video_socials_*` | video-socials-block |
| `fuera.cancer_*` | breast-cancer-awareness |
| `enpista.records_2_campeones` | race-records |
| `enpista.tts_*` (4-6 keys) | trophy-truck-specs |
| `enpista.team_kylecraft_*` | team-data |

---

## NEXT_RECOMMENDED

1. **Verificar** con grep que ninguna key marcada inactiva se usa en algún componente
2. **Verificar** que todas las keys nuevas tienen valores en `es` y `en`
3. **Lint**: `pnpm build` pasa sin warnings de traducciones faltantes

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| Una key activa se marca como inactiva por error | Low | Medium | Grep de cada key antes de marcar; revisar con teammate |
| Accumulation de keys inactivas hace el archivo difícil de leer | Medium | Low | Periódicamente crear script que extrae solo keys activas |
