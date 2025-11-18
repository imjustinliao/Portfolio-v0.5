# Justin Liao – Portfolio

My personal portfolio built with [Next.js 16](https://nextjs.org/), React 19, and plain CSS modules. It runs with the App Router and is designed to export to static HTML for hosting on GitHub Pages or any CDN.

## Getting started

```bash
git clone https://github.com/imjustinliao/Portfolio-v0.5.git
cd Portfolio-v0.5
npm install
npm run dev
```

Visit `http://localhost:3000` to preview.

## Scripts

- `npm run dev` – start the Next.js dev server
- `npm run build` – create the production build (static export enabled)
- `npm run start` – run the production server locally

## Deploying to GitHub Pages

1. Build/export: `npm run build && npx next export` (outputs to `out/`).
2. Push `out/` to a Pages source (e.g., `gh-pages` branch or `docs/` folder).
   - One option: `git subtree push --prefix out origin gh-pages`.
3. In GitHub → **Settings → Pages**, set the branch/folder you pushed.

No extra packages are required—the repo already uses static export. If you deploy to `https://<username>.github.io/Portfolio-v0.5`, set `NEXT_PUBLIC_BASE_PATH=Portfolio-v0.5` before building so routes resolve correctly. Remove that env when serving on a custom domain such as `justinliao.me`.
