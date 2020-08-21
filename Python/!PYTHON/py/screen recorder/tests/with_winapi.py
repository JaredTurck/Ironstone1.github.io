import win32gui, win32ui, win32con, time

w, h = 1920, 1080
fname_count = 0

# 28 in 1 sec - with date written to HDD
# 30 in 1 sec - without saving bitmap

def take_screenshot():

    # create window handers
    win1 = win32gui.FindWindow(None, "chrome.exe")
    win1_object = win32gui.GetWindowDC(win1)
    win1_DC = win32ui.CreateDCFromHandle(win1_object)
    win1_DC2 = win1_DC.CreateCompatibleDC()

    # create bitmap handlers
    img1 = win32ui.CreateBitmap()
    img1.CreateCompatibleBitmap(win1_DC, w, h)

    # capture screenshot
    win1_DC2.SelectObject(img1)
    win1_DC2.BitBlt((0,0), (w,h), win1_DC, (0,0), win32con.SRCCOPY)

    # writing data to HDD is slow
    img1.SaveBitmapFile(win1_DC2, "test.bmp")

    # close window handlers
    win1_DC.DeleteDC()
    win1_DC2.DeleteDC()
    win32gui.ReleaseDC(win1, win1_object)
    win32gui.DeleteObject(img1.GetHandle())


def benchmark(timeout=1):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        take_screenshot()
        count += 1

    print("Result:",count,"pixels in",timeout,"seconds!")
    print("Average:",count/timeout,"pixels per second!")
    return [timeout, count, count/timeout]

def func_speed():
    start = time.time()
    take_screenshot()
    return time.time() - start
