# SDD Full Spec — helmet-animation (removido)

## STATUS

`active` · Scoped to `EnPista.jsx` · Remoción completa de HelmetScroll.

---

## EXECUTIVE SUMMARY

La animación del casco (HelmetScroll) se elimina completamente de EnPista. El import de `HelmetScroll` y su uso en el render son removidos. El archivo `HelmetScroll.jsx` persiste en el repositorio (por si se necesita en el futuro) pero no se usa en ninguna página.

---

## REQUISITOS

| ID | Requisito | Keywords RFC 2119 |
|----|-----------|-------------------|
| HLR-01 | El import de `HelmetScroll` DEBERÁ ser removido de `EnPista.jsx` | SHALL |
| HLR-02 | El componente `HelmetScroll` NO DEBERÁ ser usado en el render de EnPista | SHALL |
| HLR-03 | La sección de casco/animation DEBERÁ desaparecer de la interfaz de EnPista | SHALL |
| HLR-04 | El archivo `src/components/HelmetScroll.jsx` DEBERÁ permanecer en el repositorio | SHALL |
| HLR-05 | Ninguna otra página DEBERÁ usar `HelmetScroll` después de este cambio | SHALL |

---

## ESCENARIO: EnPista Sin HelmetScroll

**Given** el usuario abre la página EnPista  
**When** la página termina de cargar  
**Then** NO aparece ninguna animación de casco; el scroll es normal sin efectos de Parallax del casco  

---

## ESCENARIO: HelmetScroll Persiste en Repo

**Given** un desarrollador necesita la animación del casco en el futuro  
**When** busca en `src/components/HelmetScroll.jsx`  
**Then** encuentra el archivo intacto con la implementación original  

---

## EDGE CASES

| # | Condición | Comportamiento esperado |
|---|-----------|------------------------|
| 1 | HelmetScroll se usa en otra página (FueraDePista, Home) | Verificar con grep que solo EnPista lo usaba; si se encuentra en otras páginas, no remover el import en ese archivo |
| 2 | HelmetScroll.jsx tiene dependencias que se usan en otros componentes | Revisar imports antes de dejar archivo intacto; si dependencies son únicas de HelmetScroll, pueden quedar orphanadas |
| 3 | Animación de casco interrumpe ScrollTrigger de otras secciones | Al remover, otras animaciones deben funcionar normalmente |
| 4 | ScrollTrigger instance de HelmetScroll queda en memoria | El componente no se monta; no hay instance creada; sin efecto |
| 5 | Git history mantiene el archivo | Si alguien hace `git log --follow`, el archivo sigue disponible |

---

## ARTEFACTS

| Artefacto | Ruta | Cambio |
|-----------|------|--------|
| Página | `src/pages/EnPista.jsx` | Remover import y uso de HelmetScroll |
| Archivo | `src/components/HelmetScroll.jsx` | Sin cambios (persiste en repo) |

---

## NEXT_RECOMMENDED

1. **Verificar** con grep que `HelmetScroll` no aparece en ningún archivo JSX/JS de `src/pages/`
2. **Snapshot visual**: capturar EnPista antes/después para confirmar remoción visual
3. **Verificar** que ScrollTrigger de otras secciones sigue funcionando post-remoción

---

## RIESGOS

| Riesgo | Likelihood | Impact | Mitigación |
|--------|------------|--------|------------|
| HelmetScroll se usaba en otra página inadvertidamente | Low | Medium | Grep completo en `src/` antes de confirmar remoción |
| Algún feature futuro requiere el código de HelmetScroll | Medium | Low | Archivo persiste; fácil de reintegrar con `git checkout HEAD --` |
