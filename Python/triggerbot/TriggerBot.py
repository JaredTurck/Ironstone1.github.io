import win32api, win32con
from PIL import ImageGrab
import time, os, ctypes, keyboard

class TriggerBot():
    def __init__(self):
        self.res = win32api.GetSystemMetrics(0), win32api.GetSystemMetrics(1)
        self.center_pixel = self.res[0]//2, self.res[1]//2
        self.timeout_shot = 0.3 # timeout between shots in seconds
        self.Triggerkey = "e" # toggle key
        self.ExitKey = "x"
        self.CheatOn = False
        self.get_pixel_init_done = False
        self.init_get_pixel_return = self.init_get_pixel()
        self.avg_fps = self.benchmark(timeout=1, display_txt=False)[1]
        self.avg_get_pixel_speed = sum([self.func_speed("get_pixel(0,0)") * 100 for i in range(100)]) / 1000
        self.pixel_range = []
        self.exit = False
        self.pixel_range = eval(self.read_file("pixel_range.txt"))
        self.keyHeldCount = 0
        self.mouse_clicks_count = 0

    def click(self, pixel):
        """Clicks the mouse at a specific X,Y coordinate"""
        x, y = pixel
        win32api.SetCursorPos((x,y))
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
        win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)
        self.mouse_clicks_count += 1

    def get_pixel_ig(self, x,y):
        """Gets the pixel colour using the ImageGrab.grab,\n""" +\
        """this method is slow use get_pixel() instead!"""
        img = ImageGrab.grab()
        return img.getpixel((x,y))

    def init_get_pixel(self):
        self.user = ctypes.WinDLL("c:\\Windows\\system32\\user32.dll")
        self.h = self.user.GetDC(0)
        self.gdi = ctypes.WinDLL("c:\\Windows\\system32\\gdi32.dll")
        self.get_pixel_init_done = True

    def get_pixel(self, x,y):
        """Gets the pixel colour using user32.dll"""
        if self.get_pixel_init_done == False:
            init_get_pixel()
            
        return self.gdi.GetPixel(self.h,x,y)

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

    def func_speed(self, func_name):
        """Measues the execution time of a function"""
        start = time.time()
        eval("self."+func_name)
        return time.time() - start

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
        
        for i in range(self.avg_fps*timeout):
            current_pixel = self.get_pixel(self.center_pixel[0], self.center_pixel[1])
            if current_pixel not in self.pixel_range:
                self.pixel_range.append(current_pixel)

        # update pixel_range file
        with open("pixel_range.txt", "w") as fname:
            fname.write(str(self.pixel_range))

        fpath = os.path.dirname(os.path.realpath(__file__))
        os.popen('start notepad.exe "'+fpath+'\pixel_range.txt"')

    def get_key_press(self, key):
        """checks if the user pressed a key"""
        if keyboard.is_pressed(key):
            return True
        else:
            return False

    def toggle_cheat(self):
        """Toggles the triggerbot on/off, if the user presses a key while func is called"""
        if self.get_key_press(self.Triggerkey) == True:
            if self.keyHeldCount == self.avg_fps//4:
                self.keyHeldCount += 1
                if self.CheatOn == True:
                    self.CheatOn = False
                    print("TriggerBot is OFF!")
                    
                elif self.CheatOn == False:
                    self.CheatOn = True
                    print("TriggerBot is ON!")
            else:
                self.keyHeldCount += 1
        else:
            self.keyHeldCount = 0

    def start(self, iterations=-1):
        """The main function, starts triggerbot"""
        time.sleep(1)
        while self.exit == False:
            self.toggle_cheat()
            if self.CheatOn == True:
                current_pixel = self.get_pixel(self.center_pixel[0], self.center_pixel[1])
                if current_pixel in self.pixel_range:
                    self.click(self.center_pixel)
                    time.sleep(self.timeout_shot)
                    print("enemy found! mouse clicked!")
                    if self.mouse_clicks_count > iterations:
                        self.exit = True
                    elif self.exit == False:
                        self.click(self.center_pixel)

            if self.get_key_press(self.ExitKey) == True:
                self.exit = True
