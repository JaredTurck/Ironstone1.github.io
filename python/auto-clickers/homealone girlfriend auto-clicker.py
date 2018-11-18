import win32api, win32com.client, time, win32con

def click(x,y):
    win32api.SetCursorPos((x, y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

shell = win32com.client.Dispatch("WScript.Shell")
print("the auto clicker will start in....")
for i in range(0,5):time.sleep(1); print(str(5-i)+"...")  
time.sleep(1); print("go...")

while True:
    for i in range(1000):
        shell.SendKeys("{LEFT}")
        shell.SendKeys("{UP}")
        time.sleep(0.001)

    for i in range(1000):
        shell.SendKeys("{RIGHT}")
        shell.SendKeys("{UP}")
        time.sleep(0.001)
