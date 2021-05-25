import pyautogui, time

def take_screenshot():
    a = pyautogui.screenshot()

def benchmark(timeout=1):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        take_screenshot()
        count += 1

    print("Result:",count,"pixels in",timeout,"seconds!")
    print("Average:",count/timeout,"pixels per second!")
    return [timeout, count, count/timeout]
