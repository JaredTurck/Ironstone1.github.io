from PIL import ImageGrab
import win32api, win32con

size = ImageGrab.grab().size

def click(mid):
    X,Y = mid

    win32api.SetCursorPos((X,Y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)

while True:
    image = ImageGrab.grab()
    middle = (size[0] // 2, size[1] // 2)
    cross = image.getpixel(middle)

    if all([200 <= cross[0] <= 255, 0 <= cross[1] <= 20, 0 <= cross[2] <= 20]):
        click(middle)
