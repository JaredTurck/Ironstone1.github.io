import time
from PIL import ImageGrab
assert False

while True:
    fps = 0
    start = time.time()
    while time.time() < (start+1):
        img = ImageGrab.grab()
        img.save("new.jpg")
        fps += 1

    print("fps:",fps)
