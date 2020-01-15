from PIL import Image
import random

def create(start=0, end=255):
    img = Image.new("RGB", (100,100))
    canvas = img.load()

    for i in range(100):
        for ii in range(100):
            canvas[i,ii] = tuple([random.randint(start,end) for i in range(3)])

    img.save("new.png")
