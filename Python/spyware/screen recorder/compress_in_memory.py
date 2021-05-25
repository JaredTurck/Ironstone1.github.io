from io import BytesIO
from PIL import Image, ImageGrab
import numpy

img = ImageGrab.grab()
buffer = BytesIO()
img.save(buffer, "JPEG", quality=100)

with open("a.png", "wb") as file:
    file.write(buffer.getvalue())
    
decoded = cv2.imdecode(numpy.frombuffer(buffer.getvalue(), numpy.uint8), -1)
