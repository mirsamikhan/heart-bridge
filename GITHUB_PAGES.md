# GitHub Pages demo

Demo URL: https://mirsamikhan.github.io/heart-bridge/

This project uses Astro 5 and a React Router browser application. `npm run build`
uses `astro.pages.config.mjs` to produce a static demo in `dist/` with the site
`https://mirsamikhan.github.io` and base `/heart-bridge/`. The original Wix development
configuration stays in `astro.config.mjs`; its production build is available as
`npm run build:wix`.

## GitHub settings

1. Open https://github.com/mirsamikhan/heart-bridge/settings/pages.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. If repository Actions are disabled, enable them under **Settings > Actions > General**.
   Allow the official `actions/*` actions used by the workflow.
4. Leave **Custom domain** empty. Enable **Enforce HTTPS** if GitHub offers the checkbox.
5. Commit and push the deployment changes to `main`.
6. Open **Actions > Deploy demo to GitHub Pages** and wait for both jobs to succeed.
   The deployment URL appears in **Settings > Pages** and the `github-pages` environment.
   You can also start the workflow with **Run workflow** after it exists on GitHub.

The workflow runs on each push to `main` and uses the official configure-pages,
upload-pages-artifact, and deploy-pages actions. No deployment token needs to be
added as a secret. The deployment job uses the automatic GitHub token and OIDC.

## Local verification

```sh
npm ci
npm run build
npm run preview:pages -- --port 4323
```

Visit http://localhost:4323/heart-bridge/about/. The build also verifies route files,
asset URLs, fonts, blog entry points, and the 404 shell. The preview is a temporary
local server, not the published GitHub demo.

Current routes and local Markdown blog posts each get their own `index.html`, so
refreshes and direct links succeed on GitHub Pages. `404.html` contains the same
application shell for future dynamic routes; React Router receives the original
pathname, query, and hash. Unknown URLs still carry GitHub's HTTP 404 status, but
load the application rather than GitHub's generic error page. `/health-sites`
continues redirecting to the combined screening page's locations section.

The deployment-only Babel transform prefixes literal and dynamic root-relative image/anchor attributes
and a Vite transform resolves the existing font URLs without changing page content or styling.
React Router's basename is set to `/heart-bridge` for the Pages build, so its Link
and Navigate destinations work without editing each page.

## Wix service limitation

GitHub Pages only serves static files and cannot run the Wix server, authentication,
CMS proxy, or server-side SEO integration. The static build omits the server-only
integrations; the existing page components and feature code remain unchanged.
The standalone preview currently reports a Wix CMS query error (`skip is not a
function`), so location/resource/volunteer data uses the pages' existing fallback
content. Live Wix CMS data and authentication require a separately configured
backend or Wix browser SDK integration; this workflow does not claim to enable them.
External Google Docs, SMS, email, donation links, local blog posts, and client-side
page interactions retain their existing behavior.
