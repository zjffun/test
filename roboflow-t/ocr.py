import pytesseract
from PIL import Image

# If you don't have tesseract executable in your PATH, include the following:
# pytesseract.pytesseract.tesseract_cmd = r'<full_path_to_your_tesseract_executable>'
# Example tesseract_cmd = r'C:\Program Files (x86)\Tesseract-OCR\tesseract'

# Simple image to string
# print(pytesseract.get_languages(config=''))
# print(pytesseract.image_to_string('test.png', lang='chi_sim'))
custom_oem_psm_config = r'--oem 1 --psm 11'
print(pytesseract.image_to_string(Image.open('test2.png'), lang='chi_sim', config=custom_oem_psm_config))
