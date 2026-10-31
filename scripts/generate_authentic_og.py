import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = r"C:\Users\Edery J Rodríguez A\.gemini\antigravity\brain\df5db5c9-f2af-4c3c-94bd-7d6f2e83e329\.user_uploaded"
IMG_CATEDRAL = os.path.join(BASE_DIR, "media_1793488894484_871349c2.jpg")
IMG_OBELISCO = os.path.join(BASE_DIR, "media_1793488894484_0fc47445.jpg")
IMG_FLOR = os.path.join(BASE_DIR, "media_1793488894484_221e96ba.jpg")

OUT_DIR = r"c:\Users\Edery J Rodríguez A\Documents\Edery Rodriguez\UBV\Maestria de Ciencias para el Desarrollo Estrategico\Trabajo de Investigacion\Web Estrategia Tecnologica\public"
BRAIN_DIR = r"C:\Users\Edery J Rodríguez A\.gemini\antigravity\brain\df5db5c9-f2af-4c3c-94bd-7d6f2e83e329"

W, H = 1200, 630

# 1. Lienzo de fondo slate oscuro (#0B1120 a #1E293B)
canvas = Image.new("RGBA", (W, H), (11, 17, 32, 255))
draw = ImageDraw.Draw(canvas)

# Gradiente suave de fondo
for y in range(H):
    r = int(10 + (24 - 10) * (y / H))
    g = int(15 + (33 - 15) * (y / H))
    b = int(28 + (50 - 28) * (y / H))
    draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

# Destellos de atardecer larense difuminados en el fondo (sin tocar las fotos)
ambient = Image.new("RGBA", (W, H), (0, 0, 0, 0))
a_draw = ImageDraw.Draw(ambient)
a_draw.ellipse([(-120, 360), (450, 780)], fill=(220, 38, 38, 70))    # Carmesí institucional
a_draw.ellipse([(750, 380), (1350, 800)], fill=(217, 119, 6, 65))    # Ámbar crepuscular
a_draw.ellipse([(350, 420), (850, 820)], fill=(124, 58, 237, 45))    # Violeta
ambient = ambient.filter(ImageFilter.GaussianBlur(90))
canvas = Image.alpha_composite(canvas, ambient)
draw = ImageDraw.Draw(canvas)

# Retícula técnica sutil en el fondo
for x in range(0, W, 48):
    draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 4), width=1)
for y in range(0, H, 48):
    draw.line([(0, y), (W, y)], fill=(255, 255, 255, 4), width=1)

# Cargar fuentes del sistema
try:
    font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 35)
    font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 11)
    font_card_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)
    font_card_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 11)
    font_foot = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 12)
except Exception:
    font_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 35)
    font_sub = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 15)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 11)
    font_card_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 15)
    font_card_sub = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 11)
    font_foot = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 12)

# Función para dibujar estrella de 5 puntas
def draw_star(center_x, center_y, size, fill_color):
    import math
    points = []
    for i in range(10):
        r = size if i % 2 == 0 else size * 0.42
        angle = i * math.pi / 5 - math.pi / 2
        x = center_x + r * math.cos(angle)
        y = center_y + r * math.sin(angle)
        points.append((x, y))
    return points

# 1. ENCABEZADO CENTRADO
badge_text = "UNIVERSIDAD BOLIVARIANA DE VENEZUELA • MUNICIPIO IRIBARREN • ESTADO LARA"
badge_bbox = font_badge.getbbox(badge_text)
badge_w = badge_bbox[2] - badge_bbox[0] + 32
badge_h = 24
badge_x = (W - badge_w) // 2
badge_y = 18

badge_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
b_draw = ImageDraw.Draw(badge_img)
b_draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=12, fill=(30, 41, 59, 220), outline=(220, 38, 38, 180), width=1)
b_draw.text((badge_x + 16, badge_y + 4), badge_text, font=font_badge, fill=(241, 245, 249, 240))
canvas = Image.alpha_composite(canvas, badge_img)
draw = ImageDraw.Draw(canvas)

# Título y Estrella
title_text = "PRAXIS SOCIAL IRIBARREN"
t_bbox = font_title.getbbox(title_text)
title_w = t_bbox[2] - t_bbox[0]

star_radius = 16
gap_star = 14
header_content_w = star_radius * 2 + gap_star + title_w
header_start_x = (W - header_content_w) // 2

star_cx = header_start_x + star_radius
star_cy = 76
star_pts = draw_star(star_cx, star_cy, star_radius, (220, 38, 38, 255))
draw.polygon(star_pts, fill=(220, 38, 38, 255), outline=(254, 202, 202, 220))

title_x = header_start_x + star_radius * 2 + gap_star
title_y = star_cy - 24
draw.text((title_x, title_y), title_text, font=font_title, fill=(255, 255, 255, 255))

# Subtítulo
sub_text = "Estrategia de Integración Tecnológica • Gestión Social Soberana"
s_bbox = font_sub.getbbox(sub_text)
sub_w = s_bbox[2] - s_bbox[0]
sub_x = (W - sub_w) // 2
sub_y = star_cy + 22
draw.text((sub_x, sub_y), sub_text, font=font_sub, fill=(248, 113, 113, 240))

# 2. SECCIÓN DE LAS 3 FOTOGRAFÍAS REALES SIN ALTERAR SU ESTILO
card_w = 358
card_h = 405
card_gap = 24
total_w = 3 * card_w + 2 * card_gap
start_x = (W - total_w) // 2
card_y = 142

# Datos exactos de las fotos del usuario
cards_data = [
    {
        "title": "FLOR DE VENEZUELA",
        "sub": "Monumento Fruto Vivas • Hannover",
        "img_path": IMG_FLOR,
        "accent": (234, 88, 12),    # Naranja crepuscular
        "focus_y": 0.40             # Mostrar flor, bandera y rótulo Venezuela
    },
    {
        "title": "EL OBELISCO",
        "sub": "Monumento Centenario • Arte Cinético",
        "img_path": IMG_OBELISCO,
        "accent": (220, 38, 38),    # Rojo institucional
        "focus_y": 0.22             # Desde el reloj de 4 caras hasta la plaza cinética
    },
    {
        "title": "CATEDRAL METROPOLITANA",
        "sub": "Arquitectura Hiperbólica Parabólica",
        "img_path": IMG_CATEDRAL,
        "accent": (14, 165, 233),   # Azul cielo / vitrales
        "focus_y": 0.42             # Desde la cruz superior hasta la explanada
    }
]

for idx, data in enumerate(cards_data):
    cx = start_x + idx * (card_w + card_gap)
    
    # Cargar la foto REAL del usuario sin filtros de distorsión ni estilización artificial
    raw_img = Image.open(data["img_path"]).convert("RGBA")
    
    target_img_h = card_h - 72
    img_ratio = raw_img.width / raw_img.height
    target_ratio = card_w / target_img_h
    
    if img_ratio > target_ratio:
        new_h = target_img_h
        new_w = int(target_img_h * img_ratio)
        resized = raw_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        left = int((new_w - card_w) * 0.5)
        cropped = resized.crop((left, 0, left + card_w, target_img_h))
    else:
        new_w = card_w
        new_h = int(card_w / img_ratio)
        resized = raw_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        top = int((new_h - target_img_h) * data["focus_y"])
        # Asegurar límites válidos
        top = max(0, min(top, new_h - target_img_h))
        cropped = resized.crop((0, top, card_w, top + target_img_h))
        
    card_img = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_img)
    
    # Base de la tarjeta con borde sutil
    c_draw.rounded_rectangle([0, 0, card_w, card_h], radius=18, fill=(15, 23, 42, 240), outline=(51, 65, 85, 220), width=1)
    
    # Máscara para recortar las esquinas superiores de la foto
    mask = Image.new("L", (card_w, target_img_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, card_w, target_img_h + 18], radius=18, fill=255)
    
    card_img.paste(cropped, (0, 0), mask)
    
    # Degradado suave en la parte inferior de la foto para fundir con la barra de texto
    gradient_h = 50
    photo_gradient = Image.new("RGBA", (card_w, gradient_h), (0, 0, 0, 0))
    pg_draw = ImageDraw.Draw(photo_gradient)
    for gy in range(gradient_h):
        alpha = int(255 * (gy / gradient_h))
        pg_draw.line([(0, gy), (card_w, gy)], fill=(15, 23, 42, alpha))
    card_img.alpha_composite(photo_gradient, (0, target_img_h - gradient_h))
    
    # Línea de color de acento
    c_draw.line([(0, target_img_h), (card_w, target_img_h)], fill=data["accent"] + (230,), width=3)
    
    # Identificador textual de cada monumento
    c_draw.ellipse([18, target_img_h + 16, 28, target_img_h + 26], fill=data["accent"] + (255,))
    c_draw.text((36, target_img_h + 12), data["title"], font=font_card_title, fill=(255, 255, 255, 255))
    c_draw.text((36, target_img_h + 36), data["sub"], font=font_card_sub, fill=(148, 163, 184, 255))
    
    # Borde exterior con sutil resplandor
    c_draw.rounded_rectangle([0, 0, card_w, card_h], radius=18, outline=(255, 255, 255, 25), width=1)
    
    # Sombra de la tarjeta
    shadow = Image.new("RGBA", (card_w + 24, card_h + 24), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([12, 12, card_w + 12, card_h + 12], radius=22, fill=(0, 0, 0, 180))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    
    canvas.alpha_composite(shadow, (cx - 12, card_y - 8))
    canvas.alpha_composite(card_img, (cx, card_y))

# 3. PIE DE PÁGINA
draw = ImageDraw.Draw(canvas)
draw.line([(45, H - 42), (W - 45, H - 42)], fill=(51, 65, 85, 160), width=1)

foot_left = "📍 Barquisimeto, Estado Lara • Patrimonio Arquitectónico e Identidad Urbana"
foot_right = "🔒 Base de Datos Soberana • 5 Instrumentos Marxistas • UBV"
draw.text((45, H - 32), foot_left, font=font_foot, fill=(148, 163, 184, 220))
f_bbox = font_foot.getbbox(foot_right)
draw.text((W - 45 - (f_bbox[2] - f_bbox[0]), H - 32), foot_right, font=font_foot, fill=(248, 113, 113, 220))

# 4. GUARDAR EN FORMATOS OPTIMIZADOS (< 300KB y WEBP)
canvas_rgb = canvas.convert("RGB")

# A) Formato WebP (solicitado explícitamente por el usuario para máxima compatibilidad y mínimo peso)
canvas_rgb.save(os.path.join(OUT_DIR, "og-image.webp"), "WEBP", quality=88, method=6)
canvas_rgb.save(os.path.join(OUT_DIR, "twitter-card.webp"), "WEBP", quality=88, method=6)
canvas_rgb.save(os.path.join(BRAIN_DIR, "og_image_barquisimeto_fotos.webp"), "WEBP", quality=88, method=6)

# B) Formato JPEG de alta calidad optimizado (< 300KB estricto para WhatsApp)
canvas_rgb.save(os.path.join(OUT_DIR, "og-image.jpg"), "JPEG", quality=85, optimize=True)
canvas_rgb.save(os.path.join(OUT_DIR, "twitter-card.jpg"), "JPEG", quality=85, optimize=True)
canvas_rgb.save(os.path.join(BRAIN_DIR, "og_image_barquisimeto_fotos.jpg"), "JPEG", quality=85, optimize=True)

# C) Formato PNG optimizado mediante cuantización adaptativa (< 300KB)
quant = canvas_rgb.quantize(colors=256, method=Image.Resampling.LANCZOS)
quant.save(os.path.join(OUT_DIR, "og-image.png"), "PNG", optimize=True)
quant.save(os.path.join(OUT_DIR, "twitter-card.png"), "PNG")
quant.save(os.path.join(BRAIN_DIR, "og_image_barquisimeto_fotos.png"), "PNG")

# D) Formato WhatsApp preview complementario
wa_preview = canvas_rgb.resize((800, 420), Image.Resampling.LANCZOS)
wa_preview.save(os.path.join(OUT_DIR, "whatsapp-preview.jpg"), "JPEG", quality=85, optimize=True)
wa_preview.save(os.path.join(OUT_DIR, "whatsapp-preview.webp"), "WEBP", quality=88)

print("GENERATION_COMPLETE")
