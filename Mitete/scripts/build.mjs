import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");

const siteFiles = [
  "index.html",
  "services.html",
  "projects.html",
  "about.html",
  "contact.html",
  "quote.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "llms.txt",
  "_headers",
  "_redirects"
];

const siteDirs = ["assets"];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

let copied = 0;

for (const file of siteFiles) {
  await cp(join(root, file), join(out, file));
  copied += 1;
}

for (const dir of siteDirs) {
  await cp(join(root, dir), join(out, dir), { recursive: true });
}

async function count(dir) {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      total += await count(full);
    } else {
      total += 1;
    }
  }
  return total;
}

const total = await count(out);
console.log(`dist ready: ${copied} root files, ${total} files total`);
console.log(`size: ${(await stat(out)).isDirectory() ? "directory ok" : "missing"}`);
