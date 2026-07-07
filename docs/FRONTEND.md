# Frontend Project

This repository root is the Vercel-ready Next.js App Router project for the Ethereum Strawmap Dossier.

The research files in the repository root are the single source of truth:

- `README.md`, `INDEX.md`, `SYNTHESIS.md`, `REPORT_PACK.md`
- `reports/*.md`
- `evidence/*.md`
- `notes/*.md`

The app reads those files directly at build time. There is no generated `content/` copy inside the frontend project.

## Local Development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production Check

```bash
pnpm build
pnpm start
```

## Vercel

Use these project settings:

- Root Directory: repository root
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output: Next.js default

## i18n

The site is bilingual. English is the default locale and lives at the root paths;
Chinese mirrors the full route tree under `/zh/...`. The header has a one-click
language toggle that links to the equivalent page in the other locale.

- UI strings: `lib/i18n.ts` (`ui` dictionary, `localePath` helper).
- Layer-guide and Mantle-track copy: `lib/roadmap.ts` (`layerGuidesByLocale`,
  `mantleTracksByLocale`).
- Research content: Chinese sources are `reports/*.md`, `INDEX.md`, `SYNTHESIS.md`;
  English translations are `reports/en/*.md`, `INDEX.en.md`, `SYNTHESIS.en.md` with
  the same filenames/slugs and a fixed section-heading mapping (see
  `contentConfigs` in `lib/research.ts`). Keep both locales in sync when editing
  report content — the parser keys off exact `## ` heading strings per locale.

## Information Architecture

The site is a guided reading flow rather than a single dashboard:

- `/`: landing page — reading path, the original strawmap.org roadmap image
  (`public/strawmap-original.png`, exported from the site's embedded Google Drawing),
  layer navigation cards, and the two calibration appendices.
- `/layers/[id]`: one guide page per reading line (`consensus`, `data`, `execution`,
  `account`) — what the layer does, current limits, future optimization directions,
  then the layer's deep-dive reports. Copy lives in `lib/roadmap.ts` (`layerGuides`).
- `/synthesis`: cross-layer findings, dependency spine, Mantle reading board, and the
  evidence/verification records.
- `/reports/[slug]`: individual report reader with the full report index rail and the
  per-report source rail.

## Structure

- `app/`: App Router pages and file-serving route handlers.
- `components/`: reusable dossier UI components (`Landing`, `LayerGuideView`,
  `SynthesisSections`, `ReportReader`, ...).
- `lib/`: markdown parsing, research loading, and roadmap/layer-guide data.
- `public/`: static UI assets — favicon and the original strawmap roadmap image.
- `reports/`, `evidence/`, `notes/`, root research markdown/PDF: canonical research content.
- `DESIGN.md`: design-system contract for the editorial dossier UI.
