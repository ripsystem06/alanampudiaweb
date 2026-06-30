# Design: refresh-portfolio-junio

## Technical Approach

Frontend-only refresh: CSS + JSX changes, no routing or state management changes. VideoSocialsBlock is extracted first to unlock reuse in Home and EnPista. All other changes are isolated to their respective components. GSAP/ScrollTrigger already present; new animations use the existing patterns in the codebase (IntersectionObserver for scroll-triggered opacity/transform — consistent with PistaSection, AnimatedBlock, TeamSection).

---

## Architecture Decisions

### Decision: Keep GallerySection animation as IntersectionObserver (not GSAP)

**Choice**: Conserve the existing `IntersectionObserver` + `.revealed` class pattern in GallerySection.
**Alternatives considered**: Port to GSAP + ScrollTrigger to match other sections.
**Rationale**: The current animation works correctly. Porting adds risk with zero benefit. The spec requires retaining the animation — only the phrase cards are removed.

### Decision: PistaSection mobile order via CSS `flex-direction: column-reverse` on the grid container

**Choice**: Wrap the two `.pista-card` children in a `div.pista-grid-inner` and apply `flex-direction: column-reverse` at `max-width: 767px`.
**Alternatives considered**: DOM order swap (change markup), JS-driven `order` property.
**Rationale**: CSS-only, no JS needed, matches how the codebase already handles responsive (inline media queries in `<style>` blocks). The existing mobile overrides in PistaSection already use `max-width: 767px` — extend that pattern.
**ponytail**: No abstraction needed; one layout tweak.

### Decision: Footer watermark via `background-image` + `background-size: contain` on `::before` pseudo-element

**Choice**: Use `::before` on the footer root with `background-image`, `opacity: 0.08`, `background-position: center`, `background-repeat: no-repeat`, `background-size: contain`, `pointer-events: none`, `z-index: 0`.
**Alternatives considered**: `<img>` tag with absolute position and z-index layering.
**Rationale**: Pseudo-element avoids affecting DOM structure; `pointer-events: none` prevents interference with links. SVG logo at 0.08 opacity over a `#000` background is the cleanest subtle watermark technique.
**ponytail**: No new DOM nodes, no extra asset loading.

### Decision: Trophy Truck specs — native `<details>/<summary>` for accordion

**Choice**: Replace the 5 spec tables with a summary row of 4 generic specs + a `<details><summary>Más información</summary><div class="accordion-content">…</div></details>` block containing the detailed tables as comments or simplified labels.
**Alternatives considered**: JS toggle state, `@keyframes` height animation.
**Rationale**: Native `<details>` requires zero JS, is accessible by default (`aria-expanded`, keyboard), and avoids `max-height` hacks. The spec explicitly allows `<details>/<summary>`.
**ponytail**: No new state, no new dependencies.

### Decision: HelmetScroll removal from EnPista leaves zero-height gap

**Choice**: Simply remove `<HelmetShowcase />` from EnPista render. The section that follows (Stats Header) begins immediately after HeroSection — no placeholder needed.
**Alternatives considered**: Replace with a blank `<div>` of some height.
**Rationale**: The hero section already fills `minHeight: 100vh`. Removing the fixed canvas eliminates the scroll-driven animation without leaving a gap.

### Decision: Race Records — "2 Campeonatos Mundiales" as `<h3>` above the existing list

**Choice**: The Stats Header (`div[ref=headerRef]`) currently shows 4 stat chips. Remove the `campeonato_mundial` chip and add a `span` or `h3` above the list that reads "2 Campeonatos Mundiales" via `t('enpista.records_2_campeones')`. The large `position: absolute` number is already NOT in the current header — it was a pre-existing design artifact that the spec clarifies should not be reintroduced.
**Rationale**: Minimal DOM change. Hook into existing structure.

### Decision: TeamSection Kyle Craft stats — remove `<div>` rows, preserve structure

**Choice**: In `TeamSection`, the 3 stat chips (`100%`, `0`, `03:30`) are part of a "Protocol" column alongside Rodrigo bio. These are the stats that the spec says are "excessive". Remove the 3-chip column and keep only the text bio. The `/* Kyle Craft stats — see Jira ticket XXX */` comment preserves the data.
**Rationale**: Preserves layout 2-column structure; only the chips go away.

---

## Data Flow

```
Home.jsx
  ├── Hero
  ├── PerfilReveal
  ├── GallerySection      ── (phrase logic stripped)
  ├── PistaSection        ── (mobile order inverted, no GSAP change)
  ├── ProductosPromo
  ├── Patrocinadores
  └── VideoSocialsBlock    ← NEW: extracted from FueraDePista

EnPista.jsx
  ├── HeroSection
  ├── (HelmetScroll REMOVED — zero-height gap)
  ├── StatsHeader          ── (race records "2 Campeonatos" heading)
  ├── YearNavigation + RaceList (accordion)
  ├── TrophyTruckSection    ── (5 tables → 4 specs + <details> accordion)
  ├── CoDriverSection
  ├── TeamSection          ── (Kyle Craft stats removed)
  ├── VideoSocialsBlock    ← NEW: pre-CountdownInline
  └── CountdownInline

FueraDePista.jsx
  ├── Header
  ├── BioSection
  ├── MasQueUnColor (breast cancer — updated)
  ├── Citas
  ├── (Filosofia REMOVED)
  ├── YouTube + Instagram ← EXTRACTED → VideoSocialsBlock
  └── (Instagram grid removed — replaced by VideoSocialsBlock usage)

Footer.jsx ── (black bg, magenta border, watermark ::before)
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/VideoSocialsBlock.jsx` | **Create** | Shared component: YouTube iframe + 3×3 Instagram grid. Props: `videoId`, `instagramLinks[]`. |
| `src/components/VideoSocialsBlock.css` | **Create** | Responsive layout: column stack (<768px), side-by-side (≥768px). |
| `src/components/GallerySection.jsx` | **Modify** | Strip `phrases[]` array, strip `phraseIdx` counter, strip phrase-interleaving logic, strip phrase card JSX branch. |
| `src/components/PistaSection.jsx` | **Modify** | Add `pista-grid-inner` wrapper div; add mobile `flex-direction: column-reverse` via `<style>` media query. |
| `src/components/Footer.jsx` | **Modify** | Change outer container to `background: #000` + `border: 2px solid #E91E8C`; add `::before` watermark with opacity 0.08. |
| `src/pages/FueraDePista.jsx` | **Modify** | Update breast cancer section (text, logo, 2 placeholder cards); remove `filosofia` array and Filosofia render block; remove YouTube section (lines 608-686) and Instagram grid (lines 688-854). |
| `src/pages/EnPista.jsx` | **Modify** | Remove `HelmetShowcase` import and render; update StatsHeader; replace 5 spec tables with 4 specs + `<details>` accordion; simplify TeamSection stats; insert `VideoSocialsBlock` before `CountdownInline`. |
| `src/pages/Home.jsx` | **Modify** | Import and insert `VideoSocialsBlock` after `Patrocinadores`. |
| `src/i18n/translations.js` | **Modify** | Mark `home.gallery_polvo`…`home.gallery_polvo2` as `// INACTIVE (refresh-portfolio-junio)`; mark `fueradepista.filosofia_*` as `// INACTIVE (refresh-portfolio-junio)`; add keys: `home.video_socials_*`, `fuera.cancer_*`, `enpista.records_2_campeones`, `enpista.tts_*`, `enpista.team_kylecraft_*`. |

---

## Component Design

### VideoSocialsBlock (NEW)

**Props**: `videoId: string`, `instagramLinks: string[]` (9 items)

**Current state**: N/A (new component)

**Target state**:
- Desktop: `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem`
- Mobile: single column, YouTube on top, Instagram grid below
- YouTube iframe: `loading="lazy"`, `title` from `t('home.video_socials_title')`
- Instagram grid: 3×3, each item a link to `instagramLinks[i]`, opens in new tab
- Fallback when `videoId` null/undefined: placeholder div with play-icon SVG and `t('home.video_socials_placeholder')`
- Placeholder Instagram items: dashed border, no link, `data-placeholder="true"`

**CSS approach**: Plain CSS file, `background: var(--black-mid)`, `border-top: 1px solid rgba(233,30,99,0.08)`.

### GallerySection (MODIFIED)

**Current state**: `items` array mixes image and phrase objects; phrase cards render `<p>{t(phraseKey)}</p>`.

**Target state**: `items` = `allImages.map((img, i) => ({ type: 'image', src: base+img, col: spans[i%spans.length].col, row: spans[i%spans.length].row }))`. One JSX branch only: `type === 'image'`.

**CSS approach**: No changes to CSS. Remove `.gallery-card.phrase` styles from the `<style>` block.

**Animation**: IntersectionObserver with `.revealed` unchanged.

### PistaSection (MODIFIED)

**Change**: Wrap `{blocks.map(...)}` in `<div className="pista-grid-inner" style={{ display: 'flex', flexDirection: 'column' }}>`.
Add `@media (max-width: 767px) { .pista-grid-inner { flex-direction: column-reverse; } }` to existing `<style>` block.

**Animation**: Existing `IntersectionObserver` + `visible` state unchanged.

### Footer (MODIFIED)

**Current state**: Magenta background with texture, firma + casco at bottom.

**Target state**:
- Outer `<footer>`: `background: #000`, `border: 2px solid #E91E8C`, `position: relative`
- Add `::before` with watermark: `background-image: url('/logo-alan-ampudia.svg')`, `opacity: 0.08`, `background-size: contain`, `background-position: center`, `background-repeat: no-repeat`, `pointer-events: none`
- Magenta background/texture section removed entirely
- Bottom bar (`max-width: 1300px, padding: 2rem 4rem`) remains

### FueraDePista — Breast Cancer Section (MODIFIED)

**Changes**:
1. Update the `img[src="/lasorosa.png"]` to 2024-2025 campaign logo
2. Update text paragraphs (`color_text_1`, `fuerza_text`) to reflect 2024-2025 campaign
3. Add 2 placeholder cards after the existing 3 commitment items:
   ```jsx
   {['Bingo', 'Golf'].map(item => (
     <div data-placeholder="true"
       onClick={e => e.preventDefault()}
       style={{ border: '1px dashed rgba(233,30,99,0.4)', cursor: 'not-allowed', padding: '1rem', textAlign: 'center' }}>
       <span style={{ fontFamily: 'Anton', color: 'var(--magenta-bright)' }}>{item}: proximamente</span>
     </div>
   ))}
   ```
4. Remove the entire Filosofia block (lines 543-606)

### FueraDePista — YouTube + Instagram (MODIFIED)

**Change**: Both sections removed from FueraDePista. VideoSocialsBlock replaces them via usage on Home and EnPista. FueraDePista no longer has these sections.

### EnPista — Trophy Truck Specs (MODIFIED)

**Current state**: 5 `<div>` tables (Chassis, Front Suspension, Rear Suspension, Transmission, Brakes, Electronics) — 6 tables total (lines 1193-1297).

**Target state**:
- 4 summary chips inline: Potencia, Torque, Peso, Categoría
- `<details><summary>Más información</summary>` expands to show simplified detail labels (Motor, Suspensión, Transmisión, Frenos) without full spec values
- Full technical data (Builder, Material, etc.) preserved as JS comments for future reference

```jsx
{/* OLD — detail tables preserved as reference:
  // Chassis: Builder: Mason Motorsports, Material: 4130 chromoly tube...
*/}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
  {[
    { label: t('enpista.tts_potencia'), value: '~900 hp' },
    { label: t('enpista.tts_torque'), value: '~480 lb-ft' },
    { label: t('enpista.tts_peso'), value: '~7,000 lbs' },
    { label: t('enpista.tts_categoria'), value: 'Trophy Truck' },
  ].map(s => (
    <div key={s.label} style={{ background: 'var(--black-mid)', border: '1px solid rgba(233,30,99,0.3)', padding: '1rem', borderRadius: '4px' }}>
      <div style={{ fontFamily: 'Anton', fontSize: '0.8rem', color: 'var(--magenta-bright)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{s.label}</div>
      <div style={{ fontFamily: 'Anton', fontSize: '1.4rem', color: 'var(--white)' }}>{s.value}</div>
    </div>
  ))}
</div>

<details style={{ marginTop: '1rem' }}>
  <summary style={{ fontFamily: 'Anton', fontSize: '1.1rem', color: 'var(--magenta-bright)', cursor: 'pointer', padding: '0.5rem 0' }}>
    {t('enpista.tts_mas_info')}
  </summary>
  <div style={{ paddingTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    {/* Simplified detail chips */}
    {['Motor', 'Suspensión', 'Transmisión', 'Frenos'].map(d => (
      <div key={d} style={{ background: 'var(--black-soft)', padding: '0.8rem', borderLeft: '2px solid var(--magenta)' }}>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', color: 'var(--magenta)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{d}</div>
        <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.9rem', color: 'var(--white-soft)', marginTop: '0.3rem' }}>{t(`enpista.tts_${d.toLowerCase()}`)}</div>
      </div>
    ))}
  </div>
</details>
```

### EnPista — Race Records (MODIFIED)

**Change**: In the Stats Header, replace the `campeonato_mundial` stat chip (showing `{ num: '1' }`) with a heading:
```jsx
<h3 style={{ fontFamily: 'Anton', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', marginBottom: '0.5rem' }}>
  {t('enpista.records_2_campeones')}
</h3>
```
The other 3 chips (`triple_corona`, `mph_record`, `baja1000_solitario`) remain.

### EnPista — TeamSection Kyle Craft (MODIFIED)

**Change**: In the right column ("Stats & Protocol"), remove the 3 stat chips. The left column (Rodrigo bio) is untouched. The section structure remains 2-column.

### EnPista — HelmetScroll (REMOVED)

**Change**: `import HelmetShowcase from '../components/HelmetScroll'` removed from EnPista. `<HelmetShowcase />` removed from render. `HelmetScroll.jsx` file untouched.

### Home — VideoSocialsBlock (MODIFIED)

**Change**: Import `VideoSocialsBlock` and insert after `<Patrocinadores />`.

---

## CSS Strategy

**Breakpoints**: `max-width: 767px` (mobile) / `min-width: 768px` (desktop) — consistent with existing codebase.

**CSS custom properties** (already defined):
- `--magenta`: `#E91E63`
- `--magenta-bright`: `#FF0080` or similar
- `--black`: `#050505`
- `--black-mid`: `#0d0d0d`
- `--black-soft`: `#141414`
- `--white`: `#FFFFFF`
- `--white-soft`: `rgba(255,255,255,0.7)`
- `--white-dim`: `rgba(255,255,255,0.4)`

**Responsive approach**: All CSS lives in `<style>` blocks within components (existing pattern). No CSS modules or external stylesheets.

**Footer new CSS**:
```css
/* Watermark via ::before */
footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/logo-alan-ampudia.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
}
/* Ensure content is above watermark */
footer > * { position: relative; z-index: 1; }
footer { border: 2px solid #E91E8C; }
```

---

## i18n Strategy

**Keys marked inactive** (comment `// INACTIVE (refresh-portfolio-junio)`, NOT deleted):
- `home.gallery_polvo` … `home.gallery_polvo2` (10 keys)
- `fueradepista.filosofia_felicidad`, `fueradepista.filosofia_adrenalina`, `fueradepista.filosofia_amor` and their `_desc` variants (6 keys)
- Any `enpelpista.helmet_*` keys if they exist

**New keys created**:
| Key | Label |
|-----|-------|
| `home.video_socials_title` | "Último video / Latest video" |
| `home.video_socials_placeholder` | "Video próximamente / Video coming soon" |
| `home.video_socials_instagram` | "Síguenos en Instagram / Follow us on Instagram" |
| `fuera.cancer_bingo_placeholder` | "Bingo: proximamente" |
| `fuera.cancer_golf_placeholder` | "Golf: proximamente" |
| `enpista.records_2_campeones` | "2 Campeonatos Mundiales / 2 World Championships" |
| `enpista.tts_potencia` | "Potencia / Power" |
| `enpista.tts_torque` | "Torque / Torque" |
| `enpista.tts_peso` | "Peso / Weight" |
| `enpista.tts_categoria` | "Categoría / Category" |
| `enpista.tts_mas_info` | "Más información / More information" |
| `enpista.tts_motor` | (generic label) |
| `enpista.tts_suspension` | (generic label) |
| `enpista.tts_transmision` | (generic label) |
| `enpista.tts_frenos` | (generic label) |

---

## Order of Implementation

1. **VideoSocialsBlock** (`src/components/VideoSocialsBlock.jsx` + `.css`) — extracted from FueraDePista; needed by Home and EnPista.
2. **translations.js** — mark inactive keys, add new keys.
3. **Home.jsx** — insert `VideoSocialsBlock`.
4. **FueraDePista.jsx** — remove Filosofia, update breast cancer section, remove YouTube + Instagram sections.
5. **EnPista.jsx** — remove HelmetScroll; update StatsHeader; replace Trophy Truck specs; simplify TeamSection; insert `VideoSocialsBlock`.
6. **GallerySection.jsx** — strip phrase logic.
7. **PistaSection.jsx** — add mobile order inversion.
8. **Footer.jsx** — apply new visual schema.

---

## Edge Cases & Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Footer border creates horizontal scroll on mobile | Low | Medium | `box-sizing: border-box` on footer; `overflow-x: hidden` on wrapper |
| Instagram grid removed from FueraDePista — social links lost | Low | Low | VideoSocialsBlock replaces it on Home + EnPista; FueraDePista no longer needs it |
| `<details>` animation jerky in Safari | Low | Low | `grid-template-rows: 0fr / 1fr` pattern if needed; spec allows native behavior |
| Trophy Truck specs still appear in DOM via source comments | Medium | Low | Acceptable per spec: "no en DOM visible" |
| HelmetScroll ScrollTrigger instance persists in memory after removal | Low | Low | Component not mounted → no instance created |
| Gallery redistribution without phrases creates awkward grid gaps | Low | Medium | Same `spans[]` pattern applied; monitor visual in Playwright |

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | GallerySection: items.length === 19, zero phrase items | `expect(items.filter(i => i.type === 'phrase').length).toBe(0)` |
| Unit | VideoSocialsBlock: renders iframe when videoId provided | Shallow render + assert |
| Unit | VideoSocialsBlock: renders placeholder when videoId is null | Shallow render + assert |
| Integration | PistaSection mobile: text appears above image | Playwright `expect(locator('.pista-grid-inner')).toHaveCSS('flex-direction', 'column-reverse')` |
| Integration | Footer: magenta border visible | Playwright screenshot, `toHaveCSS('border', '2px solid rgb(233,30,140)')` |
| Integration | EnPista: no HelmetScroll canvas in DOM | `page.locator('canvas').count()` === 0 |
| Integration | FueraDePista: Filosofia section absent | `page.locator('text=Filosofía')` returns 0 |
| E2E | Full viewport 375px: all sections render without horizontal scroll | Playwright `expect(page).toHaveCSS('overflow-x', 'hidden')` |
| E2E | pnpm build: zero errors | `pnpm build` exit code 0 |

---

## Open Questions

- [ ] Confirm the 2024-2025 breast cancer campaign logo asset path — `lasorosa.png` vs new file?
- [ ] Confirm Instagram links for VideoSocialsBlock: should all 9 be hardcoded or pulled from a config array?
- [ ] Confirm YouTube `videoId` for Home and EnPista: same video or different?
- [ ] Confirm `src/components/HelmetScroll.jsx` file is NOT deleted (stays in repo per spec).
