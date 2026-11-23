from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
OG = ASSETS / "og"
OG.mkdir(parents=True, exist_ok=True)

BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
REGULAR = r"C:\Windows\Fonts\segoeui.ttf"
BLACK = "#1d1d1f"
RED = "#de322d"
CANVAS = "#f5f5f7"
SECONDARY = "#6e6e73"
WHITE = "#ffffff"
BORDER = "#dcdce0"


def font(path, size):
    return ImageFont.truetype(path, size)


def text_size(draw, text, fnt):
    box = draw.textbbox((0, 0), text, font=fnt)
    return box[2] - box[0], box[3] - box[1]


def draw_favicon_master():
    size = 1024
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, size, size), radius=232, fill=BLACK)

    fnt = font(BOLD, 468)
    label = "4G"
    word_w, word_h = text_size(draw, label, fnt)
    gap = 34
    dot_r = 44
    total_w = word_w + gap + dot_r * 2
    x = (size - total_w) / 2
    y = (size - word_h) / 2 - 44
    draw.text((x, y), label, font=fnt, fill=WHITE)
    dot_x = x + word_w + gap + dot_r
    dot_y = y + word_h - dot_r + 8
    draw.ellipse((dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r), fill=RED)
    return img


def save_favicons(master):
    master.resize((512, 512), Image.LANCZOS).save(ASSETS / "icon-512.png")
    master.resize((192, 192), Image.LANCZOS).save(ASSETS / "icon-192.png")
    master.resize((180, 180), Image.LANCZOS).save(ASSETS / "apple-touch-icon.png")
    master.resize((150, 150), Image.LANCZOS).save(ASSETS / "mstile-150x150.png")
    master.resize((144, 144), Image.LANCZOS).save(ASSETS / "mstile-144x144.png")
    master.resize((96, 96), Image.LANCZOS).save(ASSETS / "favicon-96.png")
    master.resize((48, 48), Image.LANCZOS).save(ASSETS / "favicon-48.png")
    master.resize((32, 32), Image.LANCZOS).save(ASSETS / "favicon-32.png")
    master.resize((16, 16), Image.LANCZOS).save(ASSETS / "favicon-16.png")
    master.resize((256, 256), Image.LANCZOS).save(
        ASSETS / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )


def wrap(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = (current + " " + word).strip()
        if text_size(draw, trial, fnt)[0] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


PAGES = {
    "home": ("ELECTRICAL  \u00b7  SPECIALIST ELECTRICAL  \u00b7  CIVIL", "Electrical and civil contracting in Tanzania"),
    "services": ("CRB REGISTERED SERVICES", "Electrical, specialist electrical and civil services"),
    "projects": ("CAPABILITY BY SECTOR", "Project sectors we serve across Tanzania"),
    "about": ("COMPANY PROFILE", "A Tanzanian contractor built for accountable delivery"),
    "contact": ("CONTACT AND PROJECT BRIEF", "Talk to 4GHR about your project"),
}


def make_og(slug, eyebrow, title):
    width, height = 1200, 630
    img = Image.new("RGB", (width, height), CANVAS)
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle((64, 52, 64 + 388, 52 + 50), radius=25, fill=BLACK)
    draw.text((88, 62), "4GHR INVESTMENT LIMITED", font=font(BOLD, 22), fill=WHITE)

    eyebrow_font = font(BOLD, 20)
    draw.text((66, 164), eyebrow.upper(), font=eyebrow_font, fill=RED)
    draw.rectangle((66, 200, 112, 204), fill=RED)

    title_font = font(BOLD, 72)
    lines = wrap(draw, title, title_font, 1040)
    y = 238
    for line in lines:
        draw.text((64, y), line, font=title_font, fill=BLACK)
        y += 80

    draw.line((64, 512, width - 64, 512), fill=BORDER, width=2)
    draw.text(
        (64, 542),
        "Electrical works  \u00b7  Specialist electrical  \u00b7  Civil contracting",
        font=font(REGULAR, 22),
        fill=SECONDARY,
    )
    footer = "CRB registered local contractor  \u00b7  Tanzania"
    footer_w = text_size(draw, footer, font(BOLD, 20))[0]
    draw.text((width - 64 - footer_w, 544), footer, font=font(BOLD, 20), fill=BLACK)

    draw.ellipse((width - 104, 56, width - 64, 96), fill=RED)
    draw.text((width - 250, 62), "TANZANIA", font=font(BOLD, 18), fill=SECONDARY)

    img.save(OG / ("og-" + slug + ".png"), optimize=True)


master = draw_favicon_master()
save_favicons(master)
for slug, (eyebrow, title) in PAGES.items():
    make_og(slug, eyebrow, title)

print("Favicons and OG images written to", ASSETS)
