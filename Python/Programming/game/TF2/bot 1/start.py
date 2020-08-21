from PIL import ImageGrab, Image
import win32api, win32con, time, random

#shell = win32com.client.Dispatch("Wscript.Shell")

#shell.SendKeys("")
#shell.sleep(500)
#shell.Run("")
# http://ss64.com/vb/sendkeys.html - sendkeys

characters = [(65, 42, 25)]

size = ImageGrab.grab().size

def enemy():
    fps = 0
    end = time.time() + 1
    while time.time() < end:
        fps += 1
        img = list(ImageGrab.grab().getdata()) # take screenshot

        for RGB in characters: # if enemy in screenshot
            if RGB in img:
                pos = img.index(RGB) # index pixel
                Y = pos // size[0]
                X = pos - (Y * size[0])

                win32api.SetCursorPos((X, Y)) # move mouse to position
                win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
        else:
            X, Y = win32api.GetCursorPos()
            win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)

    return fps

def RAN():
    X, Y = win32api.GetCursorPos()
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)

time.sleep(10)
while True:
    RAN()
    time.sleep(1)
