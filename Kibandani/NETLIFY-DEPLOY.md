# Netlify deployment

This is a static, multi-page HTML site. The repository-root `netlify.toml` configures Netlify to run `node scripts/build-netlify.js` and publish `dist/`. The build script copies only the five site pages, `assets/`, and `robots.txt`; it does not publish local research, verification scripts, or workspace metadata.

## Deploy

1. Commit and push the site source and the Netlify files to the Git provider used for this project.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Let Netlify read `netlify.toml`. Confirm the build command is `node scripts/build-netlify.js` and the publish directory is `dist` if the UI asks.
4. Review the deploy preview at desktop and mobile widths. Check Home, About, Services, Projects and Contact, the CRB record links, the telephone link, image loading, and the quote form's mail-app handoff.
5. Select the final site name/domain before launch. Add that absolute URL to canonical/social metadata and a sitemap, then update `robots.txt` with the sitemap URL and submit the sitemap to search tools if desired.

## Local build check

Run `node scripts/build-netlify.js`. The generated static site appears in `dist/`. The output is intentionally allow-listed so unrelated repository files are not deployed.

The contact form is client-side and hands the message to the visitor's configured email application; it does not store or transmit form submissions to a server. A backend form service would be a separate change.
