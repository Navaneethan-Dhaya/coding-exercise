from PIL import Image, ImageEnhance, ImageFilter
import pytesseract

# -------------------------------
# 1. Load image
# -------------------------------
img = Image.open("../public/jpeg_images/full.jpg")
width, height = img.size

# -------------------------------
# 2. Crop lower part (slogan area)
# -------------------------------
roi = img.crop((0, int(height * 0.65), width, height))

# -------------------------------
# 3. Preprocessing
# -------------------------------
roi = roi.convert("L")
roi = ImageEnhance.Contrast(roi).enhance(4.0)
roi = ImageEnhance.Brightness(roi).enhance(1.3)
roi = roi.filter(ImageFilter.SHARPEN)

# Upscale for better OCR
roi = roi.resize((roi.width * 2, roi.height * 2))

# -------------------------------
# 4. OCR configuration
# -------------------------------
custom_config = r"""
--psm 6
-c preserve_interword_spaces=1
"""

# Extract text
text = pytesseract.image_to_string(roi, config=custom_config)

# -------------------------------
# 5. Keep only the slogan (last line)
# -------------------------------
lines = [line.strip() for line in text.splitlines() if line.strip()]
slogan = lines[-1] if lines else ""

# -------------------------------
# 6. Output
# -------------------------------
print("Company slogan retrieved from full.jpg :")
print(slogan)
