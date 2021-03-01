from PIL import Image, ImageGrab
import io, os

def compress(img, quality=50, compress_times=1, scale=1):
    for i in range(compress_times):
        size = int(img.size[0] * scale), int(img.size[1] * scale)
        res_img = img.resize(size, Image.ANTIALIAS)
        fbytes = io.BytesIO()
        
        res_img.save(fbytes, optimize=True, quality=50, format="png")
    res_img.show()

# original size = 265.4 KB
# compressed size = 265.4 KB
# compression not working
