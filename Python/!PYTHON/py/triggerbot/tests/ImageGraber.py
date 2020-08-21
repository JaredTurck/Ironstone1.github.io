from PIL import ImageGrab
import time

def get_pixel(x,y):
    px=ImageGrab.grab().load()
    for y in range(0,100,10):
        for x in range(0,100,10):
            color=px[x,y]
    return color

def benchmark(timeout=1):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        get_pixel(0,0)
        count += 1

    print("Result:",count,"pixels in",timeout,"seconds!")
    print("Average:",count/timeout,"pixels per second!")
    return [timeout, count, count/timeout]
