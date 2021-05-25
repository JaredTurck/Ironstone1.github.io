import win32api, win32con
from PIL import ImageGrab
import time, os

# get center pixel colour
# if pixel colour in RGB range:
# - shoot mouse
#calibrate_colours(5)

# init
res = 1920, 1080
center_pixel = res[0]//2, res[1]//2

def click(pixel):
    x, y = pixel
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

def get_pixel_colour(pixel):
    img = ImageGrab.grab()
    return img.getpixel(pixel)

def benchmark(timeout=1):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        get_pixel_colour((0,0))
        count += 1

    print("Result:",count,"pixels in",timeout,"seconds!")
    print("Average:",count/timeout,"pixels per second!")
    return [timeout, count, count/timeout]

def open_file(fname):
    with open(fname,"r") as file:
        return file.read()

def calibrate_colours(timeout=10):
    time.sleep(3), print("starting...")
    per_second = int(benchmark()[2])
    pixel_range = eval(open_file("pixel_range.txt"))
    for i in range(per_second*timeout):
        current_pixel = get_pixel_colour(center_pixel)
        if current_pixel not in pixel_range:
            pixel_range.append(current_pixel)

    with open("pixel_range.txt", "w") as fname:
        fname.write(str(pixel_range))

    fpath = os.path.dirname(os.path.realpath(__file__))
    os.popen('start notepad.exe "'+fpath+'\pixel_range.txt"')


# main
def main():
    pixel_range = eval(open_file("pixel_range.txt"))
    while True:
        current_pixel = get_pixel_colour(center_pixel)
        if current_pixel in pixel_range:
            click(center_pixel)
            print("enemy found! mouse clicked!")

choice = input("Menu: ")
if choice == "1":
    main()
