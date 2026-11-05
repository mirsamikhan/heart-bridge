# DilSe custom domain deployment

Production URL: https://dilseprogram.org/

`npm run build` uses `astro.pages.config.mjs` to generate a static site in `dist/`
with site `https://dilseprogram.org` and base `/`. The original local development
configuration in `astro.config.mjs` is unchanged: use `npm run dev` at the root URL.

## Coordinated launch

Prepare and test this configuration before changing the live domain settings.
After approval, coordinate the deployment push with the repository administrator.
The root-domain build replaces the old `/heart-bridge/` deployment; it is not a
second independently hosted demo.

1. The repository owner should verify `dilseprogram.org` in their GitHub account's
   Pages settings, adding the exact TXT record GitHub supplies in Porkbun.
2. In `mirsamikhan/heart-bridge` > Settings > Pages, keep the publishing source as
   **GitHub Actions**, set Custom domain to **dilseprogram.org**, and save.
3. Replace only the two Porkbun parking records shown in the supplied screenshot:
   the apex ALIAS to `pixie.porkbun.com` and wildcard CNAME to `pixie.porkbun.com`.
   Preserve unrelated mail, verification, and other DNS records.
4. Add these records in Porkbun (TTL 600 is fine; the apex/root host is `@`, or
   blank if Porkbun's editor uses a blank host for the root):

   | Type | Host | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | mirsamikhan.github.io |

5. Push the approved root-domain configuration to `main`. Wait for **Deploy demo
   to GitHub Pages** to succeed. Saving posts through Pages CMS continues to
   trigger this same deployment.
6. Wait for the DNS check and certificate issuance in Settings > Pages, then enable
   **Enforce HTTPS**. DNS changes and HTTPS availability can take up to 24 hours.
7. Check both https://dilseprogram.org and https://www.dilseprogram.org, including
   navigation, direct blog post links, uploaded images, fonts, and Resources.

Do not add wildcard DNS records. GitHub Actions deployments do not require a
CNAME file in the repository. Do not buy another hosting plan or change nameservers.

Official instructions:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Local verification

```sh
node --test scripts/check-pages-paths.mjs
npm run build
npm run test:run -- src/lib/blog.test.ts
npm run preview:pages -- --host 127.0.0.1 --port 4325
```

Visit http://127.0.0.1:4325/ and /about/ (no `/heart-bridge/` prefix).
The build verifies static route entry points, the 404 shell, slideshow/leadership/
partner assets, fonts, and blog routes, and rejects the old repository prefix.
Draft blog posts must not have generated routes. Blog image paths remain
`/blog-images/...` in Pages CMS and work at the root domain.

Routes and published Markdown posts each receive an `index.html` for direct
links and refreshes. `404.html` contains the same application shell; unknown URLs
retain HTTP 404 status. `/health-sites` redirects to Get Screened's locations.
React Router's production basename is `/`. Deployment-only transforms preserve
root-relative URLs and resolve the existing font references.

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
