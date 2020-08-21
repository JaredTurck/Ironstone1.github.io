from PIL import ImageGrab
from io import BytesIO
import time


def take_screenshot():
    img = ImageGrab.grab()
    buffer = BytesIO()
    img.save(buffer, "PNG", quality=10)

def func_speed(func_name):
    start = time.time()
    eval(func_name+"()")
    return time.time() - start

def benchmark(timeout=1, display=True):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        take_screenshot()
        count += 1

    if display == True:
        print("Result:",count,"frames in",timeout,"seconds!")
        print("Average:",count/timeout,"frames per second!")

    return [timeout, count, count/timeout]

print(benchmark())

# FPS drops from 30 to 9 (due to the compression)
# image compression will need to be done on another thread
