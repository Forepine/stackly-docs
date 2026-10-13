# Stackly Help Center

Plain-language guides for every part of Stackly, with screenshots of the real app. Built with [Docusaurus](https://docusaurus.io/) and styled like stackly.in.

```bash
npm install
npm start          # http://localhost:3000, reloads as you edit
npm run build      # static site in build/ (also checks for broken links)
```

- Pages live in `docs/` (one `.mdx` file per guide); the left menu is `sidebars.ts`.
- How to write a page, and the components you can use: [CONTRIBUTING.md](CONTRIBUTING.md).

## Screenshots

Every guide has image slots (`<Shot id="links/create-form" … />`). To fill one, save the screenshot as
`static/img/docs/links/create-form.png` (`.webp` and `.jpg` also work) and it appears in place of the placeholder.
With `npm start`, each placeholder shows its exact file name; on the live site, an empty slot reads "Screenshot coming soon".

Optional: `scripts/docshot/` can take screenshots of the real app with demo data (see the comment at the top of `run.mjs`).
