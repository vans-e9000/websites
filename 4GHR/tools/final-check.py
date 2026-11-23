import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

from lxml import html as lxml_html

ROOT = Path(__file__).resolve().parents[1]
pages = ["index.html", "services.html", "projects.html", "about.html", "contact.html"]
errors = []
notes = []
image_ids = {}
og_images = set()

for page in pages:
    path = ROOT / page
    text = path.read_text(encoding="utf-8")
    doc = lxml_html.fromstring(text)

    if doc.get("lang") != "en":
        errors.append(page + ": html lang is not en")
    if text.count("\u2014"):
        errors.append(page + ": em dash present")

    ids = re.findall(r'\sid="([^"]+)"', text)
    duplicates = sorted({item for item in ids if ids.count(item) > 1})
    if duplicates:
        errors.append(page + ": duplicate ids " + ", ".join(duplicates))

    title = doc.xpath("string(//title)")
    description = doc.xpath('string(//meta[@name="description"]/@content)')
    canonical = doc.xpath('string(//link[@rel="canonical"]/@href)')
    og_image = doc.xpath('string(//meta[@property="og:image"]/@content)')
    if not (10 <= len(title) <= 70):
        errors.append(page + ": title length " + str(len(title)))
    if not (80 <= len(description) <= 200):
        errors.append(page + ": description length " + str(len(description)))
    if not canonical.startswith("https://4ghrinvestment.co.tz/"):
        errors.append(page + ": canonical " + canonical)
    if not og_image.startswith("https://4ghrinvestment.co.tz/assets/og/"):
        errors.append(page + ": og image " + og_image)
    else:
        og_images.add(og_image.rsplit("/", 1)[-1])
    if len(doc.xpath("//h1")) != 1:
        errors.append(page + ": h1 count " + str(len(doc.xpath("//h1"))))

    for node in doc.xpath("//img"):
        src = node.get("src") or ""
        alt = node.get("alt") or ""
        pexels_match = re.search(r"images\.pexels\.com/photos/(\d+)/", src)
        unsplash_match = re.search(r"images\.unsplash\.com/(photo-[^?]+)", src)
        if not pexels_match and not unsplash_match:
            errors.append(page + ": unsupported image URL " + src)
            continue
        image_id = (
            "pexels-" + pexels_match.group(1)
            if pexels_match
            else "unsplash-" + unsplash_match.group(1)
        )
        if image_id in image_ids:
            errors.append(page + ": duplicate image " + image_id + " from " + image_ids[image_id])
        image_ids[image_id] = page
        if not alt.strip():
            errors.append(page + ": missing alt on image " + image_id)
        if "under construction" in alt.lower():
            errors.append(page + ": banned alt phrase on image " + image_id)

    for href in doc.xpath("//a/@href"):
        if href.startswith(("http", "mailto:", "tel:", "#")):
            continue
        target = href.split("#")[0].split("?")[0] or page
        if not (ROOT / target).exists():
            errors.append(page + ": missing local target " + href)

    for src in doc.xpath("//link[@rel='icon']/@href | //link[@rel='apple-touch-icon']/@href | //link[@rel='manifest']/@href"):
        if not (ROOT / src).exists():
            errors.append(page + ": missing head asset " + src)

    for form in doc.xpath("//form"):
        action = form.get("action") or ""
        if not action.startswith("mailto:ceo_4ghri@outlook.com"):
            errors.append(page + ": form action missing")

    json_ld = doc.xpath('//script[@type="application/ld+json"]/text()')
    for block in json_ld:
        try:
            json.loads(block)
        except Exception as error:
            errors.append(page + ": invalid JSON-LD " + str(error))
    notes.append(page + ": " + str(len(json_ld)) + " JSON-LD block(s)")

manifest = json.loads((ROOT / "site.webmanifest").read_text(encoding="utf-8"))
for icon in manifest["icons"]:
    if not (ROOT / icon["src"]).exists():
        errors.append("manifest: missing icon " + icon["src"])

for name in ["favicon.ico", "favicon.svg", "favicon-32.png", "favicon-16.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png"]:
    if not (ROOT / "assets" / name).exists():
        errors.append("favicon: missing " + name)

for og in sorted((ROOT / "assets/og").glob("*.png")):
    if og.name not in og_images:
        notes.append("og image not referenced: " + og.name)
for name in og_images:
    if not (ROOT / "assets/og" / name).exists():
        errors.append("og: missing " + name)

sitemap = ET.parse(ROOT / "sitemap.xml")
locs = [node.text for node in sitemap.getroot().iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
expected = {"https://4ghrinvestment.co.tz/"} | {"https://4ghrinvestment.co.tz/" + page for page in pages if page != "index.html"}
if set(locs) != expected:
    errors.append("sitemap: " + str(sorted(set(locs) ^ expected)))

robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
if "Sitemap: https://4ghrinvestment.co.tz/sitemap.xml" not in robots:
    errors.append("robots: sitemap missing")

notfound_path = ROOT / "404.html"
if not notfound_path.exists():
    errors.append("404.html is missing")
else:
    notfound = notfound_path.read_text(encoding="utf-8")
    if 'content="noindex, follow"' not in notfound:
        errors.append("404.html is not marked noindex")
    if "class=\"breadcrumb\"" in notfound:
        errors.append("404.html still contains a breadcrumb")

for icon in ["favicon-48.png", "favicon-96.png", "mstile-150x150.png", "mstile-144x144.png"]:
    if not (ROOT / "assets" / icon).exists():
        errors.append("icon: missing " + icon)

browserconfig = ROOT / "browserconfig.xml"
if not browserconfig.exists():
    errors.append("browserconfig.xml is missing")
else:
    try:
        ET.parse(browserconfig)
    except Exception as error:
        errors.append("browserconfig.xml is invalid: " + str(error))

netlify = ROOT / "netlify.toml"
if not netlify.exists():
    errors.append("netlify.toml is missing")
else:
    try:
        import tomllib
        config = tomllib.loads(netlify.read_text(encoding="utf-8"))
        if config.get("build", {}).get("publish") != ".":
            errors.append("netlify.toml publish directory is not .")
        redirects = config.get("redirects", [])
        if not any(item.get("from") == "/index.html" and item.get("to") == "/" for item in redirects):
            errors.append("netlify.toml index redirect is missing")
    except Exception as error:
        errors.append("netlify.toml is invalid: " + str(error))

if "https://4ghrinvestment.co.tz/404.html" in locs:
    errors.append("sitemap: 404 page should not be indexed")

print(json.dumps({
    "pages": len(pages),
    "unique_images": len(image_ids),
    "og_images": sorted(og_images),
    "notes": notes,
    "errors": errors,
}, indent=2))
