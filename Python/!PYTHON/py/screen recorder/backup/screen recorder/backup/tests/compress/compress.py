import base64
from PIL import ImageGrab

# convert image to base64
# save to disk in data file

char_set = "abcdefghijklmnopqrstuvwxyz0123456789"

def base(char, n):
    n = [n, ""]
    while n[0] != 0:
        n[1] = char[n[0] % len(char)] + n[1]
        n[0] = int(n[0] / len(char))

    return n[1]

img = ImageGrab.grab()
img_b = img.tobytes()

data = ""

for i in img_b:
    
