import win32api, win32con
from PIL import ImageGrab
import time, os, ctypes, keyboard

class TriggerBot():
    def __init__(self):
        self.res = 1920, 1080
        self.center_pixel = self.res[0]//2, self.res[1]//2
        self.timeout_shot = 0.5 # timeout between shots in seconds
        self.Triggerkey = "e" # toggle key
        self.CheatOn = False
        self.counter = 0
        self.avg_fps = 0
        self.pixel_range = []
        self.exit = False
        self.pixel_range = eval(self.read_file("pixel_range.txt"))

    def click(self, pixel):
        """Clicks the mouse at a specific X,Y coordinate"""
        x, y = pixel
        win32api.SetCursorPos((x,y))
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

    def get_pixel_ig(self, pixel):
        """Gets the pixel colour using the ImageGrab.grab,\n""" +\
        """this method is slow use get_pixel() instead!"""
        img = ImageGrab.grab()
        return img.getpixel(pixel)

    def get_pixel(self, x,y):
        """Gets the pixel colour using user32.dll"""
        user = ctypes.WinDLL("c:\\Windows\\system32\\user32.dll")
        h = user.GetDC(0)
        gdi = ctypes.WinDLL("c:\\Windows\\system32\\gdi32.dll")
        return gdi.GetPixel(h,x,y)

    def benchmark(self, timeout=1, display_txt=True):
        """Measures the number of pixel per seconds"""
        count = 0
        end_loop = time.time() + (timeout)
        while time.time() < end_loop:
            self.get_pixel(0,0)
            count += 1

        if display_txt == True:
            print("Result:",count,"pixels in",timeout,"seconds!")
            print("Average:",count/timeout,"pixels per second!")
            
        return [timeout, count, count/timeout]

    def read_file(self, fname, create_if_nonexistent=True):
        """Opens a file reads it, or creates the file if it does not exist"""
        if create_if_nonexistent == True:
            if os.path.isfile(fname) == False:
                with open(fname, "w") as file:
                    file.write("[]")
                file.close()

        # read the file
        with open(fname,"r") as file:
            return file.read()

    def calibrate_colours(self, timeout=10):
        """Captures pixel colours, and writes to file"""
        time.sleep(3), print("starting...")
        self.avg_fps = int(self.benchmark()[2])
        
        for i in range(avg_fps*timeout):
            current_pixel = self.get_pixel(center_pixel[0], center_pixel[1])
            if current_pixel not in self.pixel_range:
                self.pixel_range.append(current_pixel)

        # update pixel_range file

        # shoudn't be openning the file here
        with open("pixel_range.txt", "w") as fname:
            fname.write(str(self.pixel_range))

        fpath = os.path.dirname(os.path.realpath(__file__))
        os.popen('start notepad.exe "'+fpath+'\pixel_range.txt"')

    def get_key_press(self):
        """checks if the user pressed a key"""
        if keyboard.is_pressed(self.Triggerkey):
            return True
        else:
            return False

    def toggle_cheat(self):
        """Toggles the triggerbot on/off, if the user presses a key while func is called"""
        if self.get_key_press() == True:
            if self.counter % 2 == 0:
                self.CheatOn = True
                self.counter += 1
                print("TriggerBot is ON!")
            else:
                self.CheatOn = False
                print("TriggerBot is OFF!")

    def start(self):
        """The main function, starts triggerbot"""
        while True:
            self.toggle_cheat()
            if self.CheatOn == True:
                for i in range(avg_fps):
                    current_pixel = get_pixel(center_pixel[0], center_pixel[1])
                    if current_pixel in self.pixel_range:
                        self.click(center_pixel)
                        time.sleep(timeout_shot)
                        print("enemy found! mouse clicked!")
