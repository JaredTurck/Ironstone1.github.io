from PIL import ImageGrab, Image
from zlib import compress
import time, os, cv2, numpy, io, zlib

current_frame = ImageGrab.grab().tobytes()

with open("output.png", "wb") as file:
    file.write(compress(current_frame, 9))

def test2():
    with open("forest.jpg", "rb") as in_file:
        compressed = zlib.compress(in_file.read(), -1)
        print(in_file.tell())

    with open("forest_output.jpg", "wb") as out_file:
        out_file.write(compressed)
        print(out_file.tell())
