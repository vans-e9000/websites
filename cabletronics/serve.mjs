import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const args = process.argv.slice(2);
const root = path.resolve(args.length > 1 ? args[0] : ".");
const port = Number(args.length > 1 ? args[1] : args[0] || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".md": "text/markdown; charset=utf-8",
  ".ico": "image/x-icon"
};

const compressible = new Set([".html", ".css", ".js", ".mjs", ".json", ".svg", ".md"]);

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let file = path.join(root, urlPath);
  if (!file.startsWith(root)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  if (urlPath.endsWith("/")) file = path.join(file, "index.html");

  fs.stat(file, (err, stat) => {
    if (err || stat.isDirectory()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<!doctype html><title>404</title><h1>404</h1>");
      return;
    }
    const ext = path.extname(file).toLowerCase();
    const type = types[ext] || "application/octet-stream";
    const headers = {
      "Content-Type": type,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    };
    const acceptsGzip = /\bgzip\b/.test(req.headers["accept-encoding"] || "");
    const body = fs.createReadStream(file);

    if (compressible.has(ext) && acceptsGzip) {
      headers["Content-Encoding"] = "gzip";
      headers["Vary"] = "Accept-Encoding";
      res.writeHead(200, headers);
      body.pipe(zlib.createGzip({ level: 9 })).pipe(res);
    } else {
      headers["Content-Length"] = stat.size;
      res.writeHead(200, headers);
      body.pipe(res);
    }

    if (req.method === "HEAD") res.end();
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} on http://127.0.0.1:${port}`);
});
