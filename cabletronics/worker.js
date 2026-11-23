// Cabletronics — static multipage site on Cloudflare assets.
// Cloudflare's asset layer serves extensionless URLs from .html files
// (/about -> about.html, / -> index.html) and canonicalizes any explicit
// .html request, so we must NOT append ".html" ourselves — that creates a
// redirect loop. Just forward every request to the assets binding.
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
