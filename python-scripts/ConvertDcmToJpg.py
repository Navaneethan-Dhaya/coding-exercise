import pydicom
from PIL import Image
import os

# Input folder containing DICOM files
input_folder = "../images"   # your folder with .dcm files
# Output folder for JPEGs and favicon
output_folder = "../public/jpeg_images"
os.makedirs(output_folder, exist_ok=True)

# Loop through all DICOM files
for filename in os.listdir(input_folder):
    if filename.lower().endswith(".dcm"):
        dicom_path = os.path.join(input_folder, filename)
        ds = pydicom.dcmread(dicom_path)

        # Convert pixel array to Image
        img = Image.fromarray(ds.pixel_array)

        # Convert to RGB if grayscale
        if img.mode != "RGB":
            img = img.convert("RGB")

        # Save as JPEG
        jpeg_path = os.path.join(output_folder, f"{os.path.splitext(filename)[0]}.jpg")
        img.save(jpeg_path)
        print(f"Saved JPEG: {jpeg_path}")

        # If this is the company logo, also save as favicon.ico
        if filename.lower() == "logo.dcm":
            favicon_path = os.path.join(output_folder, "favicon.ico")
            img.save(favicon_path, format="ICO", sizes=[(16,16), (32,32)])
            print(f"Saved favicon: {favicon_path}")
