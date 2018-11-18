import win32api, win32com.client, time, win32con

def click(x,y):
    win32api.SetCursorPos((x, y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

shell = win32com.client.Dispatch("WScript.Shell")

time.sleep(3)

while True:
    shell.SendKeys("{ESC}")
    time.sleep(0.5)
    click(900, 350)
    time.sleep(0.5)
    click(200, 750)
    time.sleep(8)
