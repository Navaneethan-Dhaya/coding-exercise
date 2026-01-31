# DICOM to JPEG and Favicon Conversion

Converts DICOM (.dcm) files to JPEG images and generates a favicon from `logo.dcm`.
Below is only applicable for macOS systems and not for windows (Please do necessary setup for windows) .


```bash
# Install Python
brew install python
python3 --version

# Create & activate virtual environment
python3 -m venv env
source env/bin/activate

# Install dependencies inside the virtual environment
pip install pydicom pillow numpy

# Run the conversion script
python ConvertDCMToJpg.py

# Deactivate the virtual environment
deactivate
```



# Read Text from Image

Reads text from an image using Tesseract OCR and Python.
Below is only applicable for macOS systems and not for windows (Please do necessary setup for windows) .

```bash
# Install Tesseract
brew install tesseract

# Create & activate virtual environment
python3 -m venv env
source env/bin/activate

# Install dependencies
pip3 install pytesseract pillow

# Run script
python ImageTextReader.py

# Deactivate environment
deactivate

