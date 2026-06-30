# Tasks: refresh-portfolio-junio

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1,400–1,500 total (additions + deletions across 9 files) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 → PR 4 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | VideoSocialsBlock component + translations foundation | PR 1 | Base component other work depends on; 3 new files |
| 2 | Component cleanups (GallerySection, HelmetScroll removal, PistaSection) | PR 2 | Independent from unit 1; can run in parallel |
| 3 | Page surgery (FueraDePista, EnPista) | PR 3 | Depends on PR 1; largest diff |
| 4 | Home + Footer + final translations | PR 4 | Depends on PR 1 and PR 3 partial; smallest |

---

## Phase 1: Foundation

### PR 1 — VideoSocialsBlock + Translations

- [x] 1.1 **Create `src/components/VideoSocialsBlock.jsx`**: Extract YouTube iframe + Instagram 3×3 grid into new component. Props: `videoId` (string), `instagramLinks` (string[9]). Render placeholder when `videoId` is null/undefined. Use `loading="lazy"` on iframe. Instagram links open in new tab. Fallback placeholders use `data-placeholder="true"`. Import `useLanguage` for `t()` calls.
- [x] 1.2 **Create `src/components/VideoSocialsBlock.css`**: Responsive layout. Desktop: `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem`. Mobile (<768px): single column stack. Background `var(--black-mid)`, border-top `1px solid rgba(233,30,99,0.08)`.
- [x] 1.3 **Add new translation keys to `src/i18n/translations.js`**: Add `home.video_socials_title`, `home.video_socials_placeholder`, `home.video_socials_instagram`, `fuera.cancer_bingo_placeholder`, `fuera.cancer_golf_placeholder`, `enpista.records_2_campeones`, `enpista.tts_potencia`, `enpista.tts_torque`, `enpista.tts_peso`, `enpista.tts_categoria`, `enpista.tts_mas_info`, `enpista.tts_motor`, `enpista.tts_suspension`, `enpista.tts_transmision`, `enpista.tts_frenos`, `enpista.team_kylecraft_*` (if needed). Add to both `es` and `en` objects.

---

## Phase 2: Component Cleanups (Independent — PR 2)

- [x] 2.1 **Strip phrase logic from `src/components/GallerySection.jsx`**: Remove `phrases[]` array (lines 17–28), remove `phraseIdx` counter and the `if ((i + 1) % 4 === 0 ...)` block in items construction, remove the `if (items[items.length-1].type === 'phrase') items.pop()` guard, remove the `{item.type === 'phrase' ? <p>...</p> : <img ...>}` JSX branch, keep only the `type === 'image'` branch. Keep `IntersectionObserver` + `.revealed` unchanged. Remove `.gallery-card.phrase` CSS from the `<style>` block (but keep all other `.gallery-card` styles).
- [x] 2.2 **Remove HelmetScroll from `src/pages/EnPista.jsx`**: Remove line `import HelmetShowcase from '../components/HelmetScroll'`. Remove `<HelmetShowcase />` from render (line 784). File `HelmetScroll.jsx` untouched.
- [x] 2.3 **Add mobile order inversion to `src/components/PistaSection.jsx`**: Wrap `{blocks.map(...)}` in `<div className="pista-grid-inner" style={{ display: 'flex', flexDirection: 'column' }}>`. Add `@media (max-width: 767px) { .pista-grid-inner { flex-direction: column-reverse; } }` inside the existing `<style>` block. Keep existing `IntersectionObserver` + `visible` state and all existing animations unchanged.

---

## Phase 3: Page Surgery (PR 3 — Depends on PR 1)

- [x] 3.1 **Update FueraDePista breast cancer section in `src/pages/FueraDePista.jsx`**: Update logo `img[src="/lasorosa.png"]` to 2024-2025 campaign (or placeholder div with comment if asset unavailable). Update `color_text_1` and `fuerza_text` paragraphs for 2024-2025 campaign. Add 2 placeholder cards for Bingo and Golf after the existing 3 commitment items: `{['Bingo', 'Golf'].map(item => ( <div data-placeholder="true" onClick={e => e.preventDefault()} style={{ border: '1px dashed rgba(233,30,99,0.4)', cursor: 'not-allowed', padding: '1rem', textAlign: 'center' }}> <span style={{ fontFamily: 'Anton', color: 'var(--magenta-bright)' }}>{item}: proximamente</span> </div> ))}`.
- [x] 3.2 **Remove Filosofia block from `src/pages/FueraDePista.jsx`**: Remove the entire `div` block from lines 543–606 (the "Filosofía" section with `filosofia` array rendering 3 cards). Also remove the `filosofia` data array if it exists at the top of the file (search for it).
- [x] 3.3 **Remove YouTube + Instagram sections from `src/pages/FueraDePista.jsx`**: Remove the "YouTube — Último Video" section (lines 608–686) and the "Instagram — Últimas Publicaciones" section (lines 688–857). FueraDePista no longer uses these — they are replaced by VideoSocialsBlock on Home and EnPista.
- [x] 3.4 **Update StatsHeader in `src/pages/EnPista.jsx`**: In the Stats Header `div[ref=headerRef]` (lines 836–846), replace the first stat chip `{ num: '1', label: t('enpista.campeonato_mundial') }` with a heading: `<h3 style={{ fontFamily: 'Anton', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: '0.5rem' }}>{t('enpista.records_2_campeones')}</h3>`. The other 3 chips (`triple_corona`, `mph_record`, `baja1000_solitario`) remain. Ensure no `position: absolute` number "2" is introduced.
- [x] 3.5 **Replace Trophy Truck specs in `src/pages/EnPista.jsx`**: In the TrophyTruckSection (~lines 1185–1299), replace the 5 `<div>` spec tables (Chassis, Front Suspension, Rear Suspension, Transmission, Brakes, Electronics — approximately 115 lines) with: (a) 4 summary chips inline (Potencia ~900hp, Torque ~480lb-ft, Peso ~7000lbs, Categoría Trophy Truck) using a grid of styled divs; (b) a `<details><summary>Más información</summary>` accordion with simplified labels (Motor, Suspensión, Transmisión, Frenos) as child divs. Preserve all original table data as JS comments for future reference. Use `t()` for all labels.
- [x] 3.6 **Simplify TeamSection Kyle Craft stats in `src/pages/EnPista.jsx`**: In `TeamSection()` function (~lines 394–429), remove the 3 stat chips `{ num: '100%' ...}`, `{ num: '0' ...}`, `{ num: '03:30' ...}`. Keep the left column (Rodrigo bio) and section structure unchanged. Add a `/* Kyle Craft stats removed — see Jira ticket XXX */` comment preserving the data.
- [x] 3.7 **Insert VideoSocialsBlock in `src/pages/EnPista.jsx`**: Import `VideoSocialsBlock` from `'../components/VideoSocialsBlock'`. Insert `<VideoSocialsBlock videoId={null} instagramLinks={[]} />` before `<CountdownInline />` (line ~1447). Use `videoId={null}` as placeholder initially.

---

## Phase 4: Final Integration (PR 4 — Depends on PR 1 and PR 3)

- [x] 4.1 **Insert VideoSocialsBlock in `src/pages/Home.jsx`**: Import `VideoSocialsBlock` from `'../components/VideoSocialsBlock'`. Insert `<VideoSocialsBlock />` after `<Patrocinadores />` (line 22). Pass appropriate `videoId` and `instagramLinks` props (or null/empty as placeholder).
- [x] 4.2 **Rebuild Footer visual in `src/components/Footer.jsx`**: Change outer `<footer>` container: `background: '#000'`, `border: '2px solid #E91E8C'`, keep `position: 'relative'`. Add `::before` pseudo-element via CSS (inside the component's existing `<style>` tag or inline): `content: ''; position: absolute; inset: 0; background-image: url('/logo-alan-ampudia.svg'); background-size: contain; background-position: center; background-repeat: no-repeat; opacity: 0.08; pointer-events: none; z-index: 0`. Add `footer > * { position: relative; z-index: 1; }`. Remove the magenta background/texture divs (`div` with `backgroundImage: 'url(/texture-contrast.svg)'`) and the `CASCO`/`FIRMA` images entirely. Keep the bottom bar (`max-width: 1300px, padding: 2rem 4rem`) and all links/socials unchanged.
- [x] 4.3 **Mark inactive translation keys in `src/i18n/translations.js`**: Add `// INACTIVE (refresh-portfolio-junio)` comment before `home.gallery_polvo` (line ~62) through `home.gallery_polvo2` (~line 71 — 10 keys). Add `// INACTIVE (refresh-portfolio-junio)` before `fueradepista.filosofia_felicidad`, `fueradepista.filosofia_adrenalina`, `fueradepista.filosofia_amor` and their `_desc` variants. Do NOT delete any keys. Check for `enpista.helmet_*` keys and mark any as inactive if they exist.
- [x] 4.4 **Verify build**: Run `pnpm build` and confirm zero errors. Check that `src/components/HelmetScroll.jsx` still exists in the repo (file not deleted).

---

## Implementation Notes

**Order dependency**: PR 1 (VideoSocialsBlock) must land before PR 3 and PR 4 (which insert VideoSocialsBlock). PR 2 (GallerySection, HelmetScroll removal, PistaSection) is fully independent and can run in parallel with PR 1.

**Acceptance criteria per task**:
- VideoSocialsBlock renders iframe when `videoId` provided, placeholder when null
- GallerySection has zero phrase cards in DOM after task 2.1
- EnPista has no `<canvas>` elements from HelmetScroll after task 2.2
- PistaSection text appears above image on mobile (375px viewport)
- FueraDePista has no "Filosofía" heading after task 3.2
- FueraDePista YouTube + Instagram sections absent after task 3.3
- "2 Campeonatos Mundiales" heading visible in EnPista StatsHeader after task 3.4
- Trophy Truck specs show 4 chips + accordion, no 6 tables after task 3.5
- TeamSection shows no stat chips for Kyle Craft after task 3.6
- Footer shows black background + magenta border + watermark after task 4.2
- `pnpm build` exits with code 0 after all tasks
