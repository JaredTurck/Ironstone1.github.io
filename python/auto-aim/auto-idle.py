import win32api, win32con, win32com.client, time

shell = win32com.client.Dispatch("WScript.Shell")

def click(x,y):
    win32api.SetCursorPos((x, y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

time.sleep(5)
while True:
    time.sleep(1)
    shell.SendKeys("i")
    time.sleep(1)
    click(0,0)
