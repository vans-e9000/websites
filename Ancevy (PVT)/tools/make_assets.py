"""Build the local brand assets for the ANCEVY (PVT) LIMITED website.

Outputs (written to the website root):
  favicon.svg is authored by hand and lives in the root.
  favicon-16.png, favicon-32.png, apple-touch-icon.png,
  icon-192.png, icon-512.png, og-image.png
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
NAVY = "#184081"
WHITE = "#ffffff"
INK = "#343345"
GREY = "#595d7b"
BORDER = "#d4d4d4"
SURFACE = "#f5f5f5"

# A clean lightning bolt, expressed in a 0-64 box.
BOLT = [(40, 11), (19, 36), (30, 36), (26, 55), (48, 29), (36, 29), (41, 11)]

FONT_DIR = Path(r"C:\Windows\Fonts")


def font(name: str, size: int):
    for candidate in (name, "segoeuib.ttf", "arialbd.ttf", "calibrib.ttf"):
        path = FONT_DIR / candidate
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def font_regular(name: str, size: int):
    for candidate in (name, "segoeui.ttf", "arial.ttf", "calibri.ttf"):
        path = FONT_DIR / candidate
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def draw_mark(size: int, radius_ratio: float = 0.22) -> Image.Image:
    """Navy rounded square with a white bolt, supersampled for clean edges."""
    scale = 8
    side = size * scale
    image = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        (0, 0, side, side), radius=int(side * radius_ratio), fill=NAVY
    )
    points = [(x / 64 * side, y / 64 * side) for x, y in BOLT]
    draw.polygon(points, fill=WHITE)
    return image.resize((size, size), Image.LANCZOS)


def save_icon(size: int, name: str):
    draw_mark(size).save(ROOT / name)


def build_icons():
    save_icon(16, "favicon-16.png")
    save_icon(32, "favicon-32.png")
    save_icon(180, "apple-touch-icon.png")
    save_icon(192, "icon-192.png")
    save_icon(512, "icon-512.png")


def build_og():
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), WHITE)
    draw = ImageDraw.Draw(image)

    # Brand block
    mark = draw_mark(76, 0.24)
    image.paste(mark, (80, 76), mark)
    draw.text((178, 82), "ANCEVY", font=font("seguisb.ttf", 40), fill=INK)
    draw.text(
        (180, 130),
        "P V T   L I M I T E D",
        font=font_regular("segoeui.ttf", 16),
        fill=GREY,
    )

    # Headline
    draw.text(
        (80, 236),
        "Electrical contracting",
        font=font("seguisb.ttf", 62),
        fill=INK,
    )
    draw.text(
        (80, 312),
        "built for Tanzania's growth.",
        font=font("seguisb.ttf", 62),
        fill=NAVY,
    )

    # Supporting copy
    draw.text(
        (80, 418),
        "Installation, power distribution and maintenance for homes,",
        font=font_regular("segoeui.ttf", 24),
        fill=GREY,
    )
    draw.text(
        (80, 454),
        "businesses and industry across Tanzania.",
        font=font_regular("segoeui.ttf", 24),
        fill=GREY,
    )

    # Credential pills
    pills = ["Class 4 CRB registered", "Local ownership", "Nationwide delivery"]
    x = 80
    pill_font = font_regular("segoeui.ttf", 18)
    for label in pills:
        box = draw.textbbox((0, 0), label, font=pill_font)
        w = box[2] - box[0] + 44
        draw.rounded_rectangle((x, 498, x + w, 538), radius=20, outline=BORDER, width=2)
        draw.text((x + 22, 508), label, font=pill_font, fill=INK)
        x += w + 14

    # Footer band
    draw.rectangle((0, 560, width, height), fill=NAVY)
    draw.text(
        (80, 580),
        "E4/269/02/2026   |   +255 784 670 205   |   daudi.mpocholwa@gmail.com   |   ancevy.co.tz",
        font=font_regular("segoeui.ttf", 20),
        fill=WHITE,
    )

    image.save(ROOT / "og-image.png", optimize=True)


if __name__ == "__main__":
    build_icons()
    build_og()
    print("assets written to", ROOT)
