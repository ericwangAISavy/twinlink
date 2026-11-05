"""Pair accepted screenshots at native pixel density; preserve originals."""
from pathlib import Path
from PIL import Image, ImageDraw
base = Path(__file__).resolve().parents[1]
repo = base.parents[1]
r = repo / 'docs/checkpoint-2/evidence'
c = base / 'evidence'
def pair(name, left, right):
    left, right = left.convert('RGB'), right.convert('RGB')
    out = Image.new('RGB', (left.width + right.width, max(left.height, right.height) + 28), '#ddd')
    draw = ImageDraw.Draw(out)
    draw.text((8, 6), 'Reference', fill='black')
    draw.text((left.width + 8, 6), 'TwinLink — checkpoint 4', fill='black')
    out.paste(left, (0, 28))
    out.paste(right, (left.width, 28))
    out.save(c / name, quality=90)
home, implementation = Image.open(r / 'home-desktop.png'), Image.open(c / 'desktop-home.png')
pair('compare-desktop-context.jpg', home, implementation)
pair('compare-header.jpg', home.crop((0, 0, 1440, 70)), implementation.crop((0, 0, 1440, 70)))
pair('compare-mobile-menu.jpg', Image.open(r / 'mobile-menu.png'), Image.open(c / 'mobile-menu.png'))
pair('compare-mobile-context.jpg', Image.open(r / 'home-touch-mobile.png'), Image.open(c / 'mobile-home.png'))
pair('compare-contact.jpg', Image.open(r / 'contact-desktop.png'), Image.open(c / 'desktop-contact.png'))
full = Image.open(repo / 'docs/checkpoint-1/evidence/01-home-desktop-full.png')
start = min(y for y in range(full.height // 2, full.height) if full.getpixel((0, y))[:3] == (0, 0, 139))
pair('compare-footer.jpg', full.crop((0, start, 1440, full.height)), Image.open(c / 'desktop-footer.png'))
pair('compare-auth.jpg', Image.open(c / 'before-login.png'), Image.open(c / 'after-login.png'))
