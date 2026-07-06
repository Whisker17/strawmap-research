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

## Structure

- `app/`: App Router pages and file-serving route handlers.
- `components/`: reusable dossier UI components.
- `lib/`: markdown parsing, research loading, and roadmap data.
- `public/`: static UI assets only, currently the favicon.
- `reports/`, `evidence/`, `notes/`, root research markdown/PDF: canonical research content.
- `DESIGN.md`: design-system contract for the editorial dossier UI.
