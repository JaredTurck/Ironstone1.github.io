import win32api, win32con
from PIL import ImageGrab
import time, os, ctypes, keyboard

# get center pixel colour
# if pixel colour in RGB range:
# - shoot mouse
#calibrate_colours(5)

# init
res = 1920, 1080
center_pixel = res[0]//2, res[1]//2
timeout_shot = 0.5 # timeout between shots in seconds
Triggerkey = "e" # hold to turn cheat on

def click(pixel):
    x, y = pixel
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

def get_pixel_colour(pixel):
    img = ImageGrab.grab()
    return img.getpixel(pixel)

def get_pixel(x,y):
    user= ctypes.WinDLL("c:\\Windows\\system32\\user32.dll")
    h = user.GetDC(0)
    gdi= ctypes.WinDLL("c:\\Windows\\system32\\gdi32.dll")
    return gdi.GetPixel(h,x,y)

def benchmark(timeout=1, display_txt=True):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        get_pixel(0,0)
        count += 1

    if display_txt == True:
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
        current_pixel = get_pixel(center_pixel[0], center_pixel[1])
        if current_pixel not in pixel_range:
            pixel_range.append(current_pixel)

    with open("pixel_range.txt", "w") as fname:
        fname.write(str(pixel_range))

    fpath = os.path.dirname(os.path.realpath(__file__))
    os.popen('start notepad.exe "'+fpath+'\pixel_range.txt"')

def get_key_press(key):
    if keyboard.is_pressed(key):
        return True
    else:
        return False

# main
def main():
    pixel_range = eval(open_file("pixel_range.txt"))
    while True:
        if get_key_press(Triggerkey) == True:
            for i in range(avg_fps):
                current_pixel = get_pixel(center_pixel[0], center_pixel[1])
                if current_pixel in pixel_range:
                    click(center_pixel)
                    time.sleep(timeout_shot)
                    print("enemy found! mouse clicked!")

avg_fps = benchmark(timeout=1, display_txt=False)[1]
choice = input("Menu: \n1. Start Triggerbot\n2. Calibrate Colours\n3. Benchmark\n> ")
if choice == "1":
    main()
    
elif choice == "2":
    while True:
        input("Press Enter to begin calibrating colours!")
        calibrate_colours()

elif choice == "3":
    benchmark()
