# Deployment notes

This is a static, crawler-visible website. Upload the contents of this folder to any static host that supports clean file paths.

Before going live, set the real public origin in every page's canonical and `og:url` tags, then create `sitemap.xml` with that same origin. The current source intentionally omits guessed absolute canonical URLs because no live domain was provided.

Recommended production settings:

- Serve over HTTPS.
- Enable Brotli or gzip for HTML, CSS, JavaScript, and text files.
- Set long immutable caching for versioned images and assets.
- Set short caching for HTML while content is being updated.
- Keep `robots.txt`, `llms.txt`, and `llms-full.txt` at the domain root.
- Add a real `sitemap.xml` after the live origin is known.
- Connect the enquiry form to email, WhatsApp, or a backend endpoint before relying on submissions.
