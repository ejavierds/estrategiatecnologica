import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# Rutas de las imágenes subidas por el usuario
BASE_DIR = r"C:\Users\Edery J Rodríguez A\.gemini\antigravity\brain\df5db5c9-f2af-4c3c-94bd-7d6f2e83e329\.user_uploaded"
IMG_CATEDRAL = os.path.join(BASE_DIR, "media_1793485679593_3e6fd37d.jpg")
IMG_OBELISCO = os.path.join(BASE_DIR, "media_1793485679593_6877d57a.jpg")
IMG_FLOR = os.path.join(BASE_DIR, "media_1793485679593_a72d3113.jpg")

OUT_DIR = r"c:\Users\Edery J Rodríguez A\Documents\Edery Rodriguez\UBV\Maestria de Ciencias para el Desarrollo Estrategico\Trabajo de Investigacion\Web Estrategia Tecnologica\public"
BRAIN_DIR = r"C:\Users\Edery J Rodríguez A\.gemini\antigravity\brain\df5db5c9-f2af-4c3c-94bd-7d6f2e83e329"
W, H = 1200, 630

# 1. Crear lienzo de fondo 1200x630
canvas = Image.new("RGBA", (W, H), (15, 23, 42, 255))
draw = ImageDraw.Draw(canvas)

# Gradiente vertical de pizarra oscuro a azul marino profundo
for y in range(H):
    r = int(10 + (26 - 10) * (y / H))
    g = int(16 + (36 - 16) * (y / H))
    b = int(32 + (58 - 32) * (y / H))
    draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

# Resplandor crepuscular barquisimetano (atardecer cálido con tonos carmesí y violeta)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
glow_draw.ellipse([(-150, 320), (550, 780)], fill=(220, 38, 38, 75))   # Carmesí institucional
glow_draw.ellipse([(650, 340), (1350, 800)], fill=(217, 119, 6, 65))   # Ámbar crepuscular
glow_draw.ellipse([(250, 380), (950, 840)], fill=(124, 58, 237, 50))  # Violeta místico
glow = glow.filter(ImageFilter.GaussianBlur(85))
canvas = Image.alpha_composite(canvas, glow)
draw = ImageDraw.Draw(canvas)

# Retícula tecnológica sutil (nodos y líneas vectoriales)
for x in range(0, W, 48):
    draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 5), width=1)
for y in range(0, H, 48):
    draw.line([(0, y), (W, y)], fill=(255, 255, 255, 5), width=1)

# Cargar fuentes del sistema
try:
    font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 36)
    font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 11)
    font_card_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)
    font_card_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 11)
    font_foot = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 12)
except Exception:
    font_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 36)
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

# 1. ENCABEZADO CENTRADO PERFECTAMENTE
badge_text = "UNIVERSIDAD BOLIVARIANA DE VENEZUELA • MUNICIPIO IRIBARREN • ESTADO LARA"
badge_bbox = font_badge.getbbox(badge_text)
badge_w = badge_bbox[2] - badge_bbox[0] + 32
badge_h = 24
badge_x = (W - badge_w) // 2
badge_y = 22

badge_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
b_draw = ImageDraw.Draw(badge_img)
b_draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], radius=12, fill=(30, 41, 59, 210), outline=(220, 38, 38, 180), width=1)
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
star_cy = 82
star_pts = draw_star(star_cx, star_cy, star_radius, (220, 38, 38, 255))
draw.polygon(star_pts, fill=(220, 38, 38, 255), outline=(254, 202, 202, 220))

title_x = header_start_x + star_radius * 2 + gap_star
title_y = star_cy - 24
draw.text((title_x, title_y), title_text, font=font_title, fill=(255, 255, 255, 255))

# Subtítulo
sub_text = "Estrategia de Integración Tecnológica • Transformación de la Gestión Social"
s_bbox = font_sub.getbbox(sub_text)
sub_w = s_bbox[2] - s_bbox[0]
sub_x = (W - sub_w) // 2
sub_y = star_cy + 22
draw.text((sub_x, sub_y), sub_text, font=font_sub, fill=(248, 113, 113, 240))

# 2. LAS TRES TARJETAS ARQUITECTÓNICAS BASADAS EXACTAMENTE EN LAS FOTOS
card_w = 356
card_h = 394
card_gap = 26
total_w = 3 * card_w + 2 * card_gap
start_x = (W - total_w) // 2
card_y = 152

cards_data = [
    {
        "title": "FLOR DE VENEZUELA",
        "sub": "Monumento Fruto Vivas • Hannover",
        "img_path": IMG_FLOR,
        "accent": (234, 88, 12),    # Ámbar / naranja crepúsculo
        "focus_y": 0.40
    },
    {
        "title": "EL OBELISCO",
        "sub": "Monumento Centenario • Arte Cinético",
        "img_path": IMG_OBELISCO,
        "accent": (220, 38, 38),    # Rojo institucional
        "focus_y": 0.28             # Mostrar la torre y el reloj en la parte alta
    },
    {
        "title": "CATEDRAL METROPOLITANA",
        "sub": "Arquitectura Hiperbólica Parabólica",
        "img_path": IMG_CATEDRAL,
        "accent": (14, 165, 233),   # Azul cielo / vitral turquesa
        "focus_y": 0.45
    }
]

for idx, data in enumerate(cards_data):
    cx = start_x + idx * (card_w + card_gap)
    
    raw_img = Image.open(data["img_path"]).convert("RGBA")
    
    # Realce sutil de contraste y saturación fotográfica
    raw_img = ImageEnhance.Color(raw_img).enhance(1.16)
    raw_img = ImageEnhance.Contrast(raw_img).enhance(1.08)
    
    target_img_h = card_h - 76
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
        cropped = resized.crop((0, top, card_w, top + target_img_h))
        
    card_img = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_img)
    
    # Marco redondeado con fondo elegante
    c_draw.rounded_rectangle([0, 0, card_w, card_h], radius=20, fill=(15, 23, 42, 235), outline=(51, 65, 85, 220), width=1)
    
    # Máscara para bordes redondeados superiores
    mask = Image.new("L", (card_w, target_img_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, card_w, target_img_h + 20], radius=20, fill=255)
    
    card_img.paste(cropped, (0, 0), mask)
    
    # Sombra interna degradada en la base de la fotografía
    gradient_h = 70
    photo_gradient = Image.new("RGBA", (card_w, gradient_h), (0, 0, 0, 0))
    pg_draw = ImageDraw.Draw(photo_gradient)
    for gy in range(gradient_h):
        alpha = int(255 * (gy / gradient_h))
        pg_draw.line([(0, gy), (card_w, gy)], fill=(15, 23, 42, alpha))
    card_img.alpha_composite(photo_gradient, (0, target_img_h - gradient_h))
    
    # Línea de realce de color
    c_draw.line([(0, target_img_h), (card_w, target_img_h)], fill=data["accent"] + (230,), width=3)
    
    # Etiqueta de la tarjeta
    c_draw.ellipse([18, target_img_h + 18, 28, target_img_h + 28], fill=data["accent"] + (255,))
    c_draw.text((36, target_img_h + 14), data["title"], font=font_card_title, fill=(255, 255, 255, 255))
    c_draw.text((36, target_img_h + 38), data["sub"], font=font_card_sub, fill=(148, 163, 184, 255))
    
    # Borde exterior con brillo de caja
    c_draw.rounded_rectangle([0, 0, card_w, card_h], radius=20, outline=(255, 255, 255, 25), width=1)
    
    # Sombra suave
    shadow = Image.new("RGBA", (card_w + 30, card_h + 30), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([15, 15, card_w + 15, card_h + 15], radius=24, fill=(0, 0, 0, 180))
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    
    canvas.alpha_composite(shadow, (cx - 15, card_y - 10))
    canvas.alpha_composite(card_img, (cx, card_y))

# 3. PIE DE PÁGINA
draw = ImageDraw.Draw(canvas)
draw.line([(50, H - 46), (W - 50, H - 46)], fill=(51, 65, 85, 160), width=1)

foot_left = "📍 Barquisimeto • Patrimonio Arquitectónico e Identidad Larense"
foot_right = "🔒 Base de Datos Soberana • Diagnóstico Marxista • Infogobierno"
draw.text((50, H - 34), foot_left, font=font_foot, fill=(148, 163, 184, 220))
f_bbox = font_foot.getbbox(foot_right)
draw.text((W - 50 - (f_bbox[2] - f_bbox[0]), H - 34), foot_right, font=font_foot, fill=(248, 113, 113, 220))

# 4. GUARDAR
canvas_rgb = canvas.convert("RGB")
canvas_rgb.save(os.path.join(OUT_DIR, "og-image.jpg"), "JPEG", quality=95)
canvas_rgb.save(os.path.join(OUT_DIR, "twitter-card.jpg"), "JPEG", quality=95)
canvas.save(os.path.join(OUT_DIR, "og-image.png"), "PNG")
canvas.save(os.path.join(OUT_DIR, "twitter-card.png"), "PNG")

# Guardar copias en BRAIN_DIR para el artifact
canvas_rgb.save(os.path.join(BRAIN_DIR, "og_image_barquisimeto_fotos.jpg"), "JPEG", quality=95)

# También redimensionar la variante ilustrada generada por IA para que esté disponible
ai_source = os.path.join(BRAIN_DIR, "praxis_social_iribarren_og_banner_v2_1793485853497.jpg")
if os.path.exists(ai_source):
    ai_img = Image.open(ai_source).convert("RGB")
    # Redimensionar a 1200x630
    ai_cropped = ai_img.resize((1200, 630), Image.Resampling.LANCZOS)
    ai_cropped.save(os.path.join(BRAIN_DIR, "og_image_barquisimeto_ilustrada.jpg"), "JPEG", quality=95)
    ai_cropped.save(os.path.join(OUT_DIR, "og-image-ilustrada.jpg"), "JPEG", quality=95)

print("REFINED_COMPOSITION_SUCCESS")
