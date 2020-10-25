import win32api, win32con, time, keyboard, win32gui


def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

time.sleep(5)
print("start")
while True:
    try:
        time.sleep(0.1)
        x, y = win32gui.GetCursorPos()
        click(x, y)
        print("mouse clicked!")
    except:
        print("error")
