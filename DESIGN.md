# Ethereum Strawmap Dossier Design System

## 1. Atmosphere & Identity

Roadmap Dossier is an editorial research product for Mantle researchers: structured like a protocol briefing room, paced like a long-form research packet, and navigable like documentation. The signature is a warm paper atlas with a visible dependency spine: every report has a place in a layered map, every caveat remains close to the claim, and Mantle impact is elevated without rewriting the source text.

Reference extraction:
- Layer A: `redesign-skill.md` drives the audit response to the rejected static UI: stronger hierarchy, more deliberate typography, clearer states, less generic dashboard framing.
- Layer B: `claude.md` contributes warm editorial pacing, serif authority for headings, parchment/ivory surfaces, terracotta emphasis, ring-based depth, and chapter-like alternation.
- Adaptations: the palette is cooler and more protocol-oriented than Claude to avoid a one-note cream theme; cards stay at 8px radius or less per project rules; diagrams encode real roadmap relationships rather than decoration.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/canvas | `--surface-canvas` | #f4f1e8 | #171512 | Whole page background |
| Surface/paper | `--surface-paper` | #fffdf7 | #211f1b | Main reading surfaces |
| Surface/raised | `--surface-raised` | #faf6ec | #2d2a24 | Repeated cards and navigation |
| Surface/inset | `--surface-inset` | #ebe3d3 | #14120f | Diagrams, source wells, dependency lanes |
| Surface/ink | `--surface-ink` | #171512 | #f8f1df | Dark chapter bands |
| Text/primary | `--text-primary` | #1f1a14 | #fff9ea | Headings and body emphasis |
| Text/secondary | `--text-secondary` | #61584c | #d8cfbd | Body and summaries |
| Text/muted | `--text-muted` | #6c6254 | #c8bea8 | Metadata, section labels |
| Border/subtle | `--border-subtle` | #e5dccc | #3a352e | Quiet dividers |
| Border/strong | `--border-strong` | #cfc2ad | #514a40 | Interactive rings and tables |
| Accent/terracotta | `--accent-terracotta` | #9f472e | #e08a64 | Primary emphasis and Mantle callouts |
| Accent/teal | `--accent-teal` | #1f6f67 | #70c8bd | Data layer and DA |
| Accent/violet | `--accent-violet` | #6757b8 | #a99bff | Consensus and timing |
| Accent/amber | `--accent-amber` | #805111 | #e0ad54 | Execution, pricing, caveats |
| Accent/green | `--accent-green` | #3f7d45 | #8cc98f | Verified evidence and account/privacy |
| Status/error | `--status-error` | #a33a3a | #f08080 | Bad or unavailable checks |
| Focus/ring | `--focus-ring` | #2d6cdf | #8bb7ff | Keyboard focus |

### Rules

- Terracotta is reserved for Mantle impact, current-page state, and the primary reading path.
- Teal, violet, amber, and green map to layer semantics only. They are never used as random decoration.
- Warm neutrals create the reading canvas, but protocol accents prevent the UI from becoming beige-only.
- Raw colors outside this file and `app/globals.css` custom-property definitions are not allowed.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 44px / 2.75rem | 560 | 1.08 | 0 | Dossier title and report title on wide screens |
| H1 | 34px / 2.125rem | 560 | 1.18 | 0 | Page title and report title |
| H2 | 25px / 1.5625rem | 560 | 1.28 | 0 | Section title |
| H3 | 19px / 1.1875rem | 600 | 1.35 | 0 | Card and table title |
| Body/lg | 18px / 1.125rem | 400 | 1.72 | 0 | Executive summary and report lead |
| Body | 16px / 1rem | 400 | 1.78 | 0 | Chinese reading text |
| Body/sm | 14px / 0.875rem | 450 | 1.58 | 0 | Metadata, compact summaries |
| Caption | 12px / 0.75rem | 600 | 1.45 | 0 | Labels, layer chips, source ids |
| Mono | 12px / 0.75rem | 500 | 1.55 | 0 | EIP IDs, report numbers, file paths |

### Font Stack

- Serif: Georgia, "Songti SC", "STSong", "SimSun", serif
- Sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif
- Mono: "SF Mono", "JetBrains Mono", "Cascadia Code", ui-monospace, monospace

### Rules

- Serif is used for narrative authority: display headings, section titles, and report titles.
- Sans is used for navigation, metadata, tables, and body reading.
- Letter spacing is always 0.
- Chinese text uses `line-break: loose`, `word-break: normal`, and `overflow-wrap: anywhere` only for URLs, code, and source rows.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a 4px base unit.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Icon gaps and hairlines |
| `--space-2` | 8px | Chips, compact row gaps |
| `--space-3` | 12px | Control padding |
| `--space-4` | 16px | Small card padding |
| `--space-5` | 20px | Reading row padding |
| `--space-6` | 24px | Section inner padding |
| `--space-8` | 32px | Major group gap |
| `--space-10` | 40px | Page header spacing |
| `--space-12` | 48px | Chapter separation |
| `--space-16` | 64px | Wide-page rhythm |

### Grid

- Max content width: 1440px.
- Wide desktop (≥1440px) overview shell: 264px index rail + fluid atlas + 300px evidence rail.
- Wide desktop (≥1440px) report shell: 264px report index + 760px reader + 300px source/context rail.
- Standard desktop (1120–1439px): two columns — index rail + main content; the evidence/source rail becomes a full-width band below the main column with its blocks laid out in responsive columns. This keeps the reader at full width on 1280/1366 laptops.
- Tablet: overview rail becomes a top dossier index; evidence rail drops below the main atlas.
- Report tablet/mobile: the reader appears before the report index so the selected research remains the primary task.
- Overview mobile: the atlas appears before the report index so the project thesis and layer map are the first-viewport anchor.
- Mobile: single-column flow; all sticky sidebars become normal sections; minimum touch target is 44px.
- Mobile header uses a static paper surface instead of sticky blur to keep the first research screen fast and stable.

### Rules

- First screen must show usable research navigation, not a marketing landing page.
- Page sections are unframed bands or reading layouts; only repeated items become cards.
- No card inside another card.
- Fixed-format diagrams use stable grid tracks, aspect ratios, and minimum heights to avoid layout shift.
- Repeated cards and report body sections may use paint/layout containment to reduce render cost without hiding or removing research content.

## 5. Components

### Dossier Header
- **Structure**: `header` with project title, source-status strip, and primary links.
- **Variants**: overview, report detail.
- **Spacing**: `--space-4` to `--space-6`.
- **States**: default, hover, focus, current route.
- **Accessibility**: skip link before header; semantic navigation landmarks.
- **Motion**: hover color and 1px translate only.

### Report Index
- **Structure**: ordered list of report links with report number, layer chip, and short title.
- **Variants**: overview rail, report page rail, compact mobile grid.
- **Spacing**: `--space-3` row padding, `--space-2` row gap.
- **States**: default, hover, focus, active, appendix.
- **Accessibility**: real links with current-page `aria-current`.
- **Motion**: active/hover uses ring shadow and transform.

### Layer Atlas
- **Structure**: four layer sections with current bottleneck, optimization direction, report links, and layer-colored rail.
- **Variants**: consensus, data, execution, account/privacy.
- **Spacing**: `--space-6`.
- **States**: default, hover on report links, focus.
- **Accessibility**: section headings and descriptive link text.
- **Motion**: none beyond interactive affordance.

### Dependency Spine
- **Structure**: vertical list plus SVG spine connecting upstream capability to downstream effect and report chips.
- **Variants**: standard, caveated, Mantle-critical.
- **Spacing**: `--space-4`.
- **States**: default, report-chip hover/focus.
- **Accessibility**: relation text is fully readable without the SVG.
- **Motion**: none.

### Mantle Board
- **Structure**: four repeated action lanes: DA, proof/native rollup, sequencer/MEV, product/UX.
- **Variants**: lane accent by topic.
- **Spacing**: `--space-5`.
- **States**: default, hover on report links.
- **Accessibility**: every lane exposes report numbers as links.
- **Motion**: none.

### Report Reader
- **Structure**: report title, caveat, four-question lens, optimization table, section stream, source list.
- **Variants**: numbered report, appendix.
- **Spacing**: `--space-8` between major reading blocks.
- **States**: default, empty section omitted, source hover/focus.
- **Accessibility**: `article`, ordered heading hierarchy, visible source URLs.
- **Motion**: section entrance opacity only and disabled under reduced motion.

### Evidence Panel
- **Structure**: verification metrics, restricted-source caveats, source ledger links, claim-ledger prompt.
- **Variants**: overview sidebar, report detail source rail.
- **Spacing**: `--space-4`.
- **States**: default, link hover/focus.
- **Accessibility**: status text is not color-only.
- **Motion**: none.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 140ms | cubic-bezier(0.2, 0.8, 0.2, 1) | Link/card hover, button press |
| Standard | 220ms | cubic-bezier(0.16, 1, 0.3, 1) | Section reveal, rail state |
| Emphasis | 420ms | cubic-bezier(0.16, 1, 0.3, 1) | First page entry only |

### Rules

- Animate only `transform`, `opacity`, and color/background.
- Every interactive element has hover, active, and focus-visible states.
- No decorative looping animation.
- Respect `prefers-reduced-motion`.

## 7. Depth & Surface

### Strategy

Mixed tonal-shift plus ring shadows. The product should feel printed and layered, not glassy or dashboard-heavy.

| Level | Treatment | Usage |
|-------|-----------|-------|
| Canvas | `--surface-canvas` | Whole page |
| Paper | `--surface-paper` + subtle warm border | Reading surface |
| Raised | `--surface-raised` + `--shadow-ring` | Cards, report rows |
| Inset | `--surface-inset` + inner line | Diagrams, source wells |
| Ink | `--surface-ink` | Dependency and caveat bands |

### Rules

- Border radius tokens: `--radius-tight` 4px, `--radius-card` 8px, `--radius-panel` 8px.
- Shadows are ring-like and warm; no generic floating SaaS shadows.
- Diagrams must encode actual roadmap relations.
- Source and caveat surfaces are quieter than Mantle decision surfaces.
