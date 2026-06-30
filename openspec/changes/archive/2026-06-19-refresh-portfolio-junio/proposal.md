# Proposal: refresh-portfolio-junio

## Intent

Refrescar el portfolio de Alan Ampudia con cambios visuales, de contenido y de UX en múltiples secciones y páginas. Los objetivos centrales son: simplificar la galería removiendo frases intercaladas, mejorar la responsividad móvil de En/Fuera de Pista, redefinir estéticamente el footer, actualizar contenido sensible (cáncer de mama), limpiar secciones obsoletas, y preparar componentes compartidos paravideo/redes sociales.

## Scope

### In Scope
- GallerySection: reorganización de 19 imágenes sin frases
- PistaSection: inversión orden imagen/texto en móvil + animaciones de entrada
- Footer: nuevo esquema visual (outline magenta, fondo negro, logo watermark)
- FueraDePista: actualización sección cáncer de mama, cambio quote México, remoción Filosofía
- Home + EnPista:插入 último video + redes sociales
- EnPista:移除 animación casco, actualizar records, simplificar specs Trophy Truck, ajustar datos Team
- translations.js: limpiar keys huérfanas de secciones removidas

### Out of Scope
- Nuevas páginas o rutas
- Cambios en Calendario, Equipo, Tienda, Legal
- Migración de datos de RacingData a formato externo
- Implementación de links reales en placeholders de bingo/golf

## Capabilities

### New Capabilities
- `video-socials-block`: Componente compartido (extraído de FueraDePista) con iframe YouTube + grid Instagram, reutilizable en Home y EnPista

### Modified Capabilities
- `gallery`: cambio de layout yremoval de frases asociadas (keys `home.gallery_*` pasan a inactivas)
- `footer`: cambio de esquema visual completo (fondo, textura, watermark, firmas)
- `pista-section`: inversión orden responsive + animaciones de entrada
- ` breast-cancer-awareness`: actualización de texto, logotipo y estructura de tarjetas placeholder
- `race-records`: modificación de datos exibidos (sin posición absoluta, 2 campeonatos)
- `trophy-truck-specs`: reemplazo de 6 tablas técnicas por specs genéricas + tarjetas interactivas
- `team-data`: limpieza de stats técnicos de Kyle Craft
- `helmet-animation`:remocion completa de HelmetScroll en EnPista

## Approach

Cambios mayormente frontales (CSS + JSX) sin alterar arquitectura de rutas ni estado. Componente `VideoSocialsBlock` se extrae de FueraDePista como primer paso para habilitar reutilización. Footer serebilde sin cambios en estructura de links. Specs de Trophy Truck se simplifican a 3–4 puntos clave con botón de tarjetas informacionales (accordion/toggle). Traducciones asociadas a secciones removidas se marcan como inactivas pero no se borran (preserva historial i18n).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/GallerySection.jsx` | Modified | Remover frases, reorganizar grid |
| `src/components/PistaSection.jsx` | Modified | Responsive invert + animaciones |
| `src/components/Footer.jsx` | Modified | Outline magenta, fondo negro, watermark |
| `src/pages/FueraDePista.jsx` | Modified | Breast cancer, quote México,remover Filosofía |
| `src/pages/EnPista.jsx` | Modified | Remover casco, records, specs, team |
| `src/pages/Home.jsx` | Modified | Insertar VideoSocialsBlock |
| `src/i18n/translations.js` | Modified | Limpiar keys inactivas |
| `src/components/HelmetScroll.jsx` | Removed | Import/uso quitado de EnPista (archivo persiste) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Remover frases gallery impacting SEO o referencias externas | Low | keys en translations se mantienen inactivas, no se borran |
| Placeholder cards de bingo/golf generar confusión | Low | Agregar `data-placeholder="true"` y comentario en código |
| Cambio de specs Trophy Truck afectar percepción técnica del equipo | Medium | Contenido genérico sigue siendo correcto; datos específicos disponibles bajo request |
| Breaking layout en mobile si breakpoint `window.innerWidth < 768` falla | Low | Verificar con Playwright en viewport 375px |

## Rollback Plan

Cada archivo modificado tiene backup en git. Rollback por archivo:
```bash
git checkout HEAD -- src/components/GallerySection.jsx src/components/Footer.jsx src/pages/FueraDePista.jsx src/pages/EnPista.jsx src/pages/Home.jsx src/i18n/translations.js
```
Cambios de translations requieren reintegrar keys inactivas si se hizo cleanupprematura.

## Dependencies

- Ninguna dependencia externa nueva
- GSAP/ScrollTrigger ya presente para animaciones de entrada
- Componente VideoSocialsBlock extraído del código existente de FueraDePista

## Success Criteria

- [ ] Galería exhibe 19 imágenes sin frases visibles en ningún idioma
- [ ] Footer muestra outline rosa magenta sobre fondo negro con logo watermark
- [ ] Mobile: PistaSection muestra texto encima de imagen
- [ ] Sección Filosofía (3 cards) eliminada de FueraDePista
- [ ] Animación del casco no aparece en ninguna página
- [ ] Records muestran "2 Campeonatos Mundiales", sin posición absoluta
- [ ] Trophy Truck specs genéricas con botón de tarjetas informacionales
- [ ] VideoSocialsBlock visible en Home (post-Patrocinadores) y EnPista (pre-Footer)
- [ ] Build exitoso: `pnpm build` sin errores
