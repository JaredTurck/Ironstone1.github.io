from mss import mss
from PIL import Image
import time

def capture_screenshot():
    # Capture entire screen
    with mss() as sct:
        monitor = sct.monitors[1]
        img = sct.grab(monitor)
        # Convert to PIL/Pillow Image
        return Image.frombytes('RGB', img.size, img.bgra, 'raw', 'BGRX')

def benchmark(timeout=1):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        capture_screenshot()
        count += 1

    print("Result:",count,"pixels in",timeout,"seconds!")
    print("Average:",count/timeout,"pixels per second!")
    return [timeout, count, count/timeout]
