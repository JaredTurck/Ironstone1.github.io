import win32api, win32con, win32gui, time

def click(x, y):
    win32api.SetCursorPos((x, y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

print("the auto clicker will start in....")
for i in range(0,5):time.sleep(1); print(str(5-i)+"...")  
time.sleep(1); print("go...")

while True:
    time.sleep(1)
    click(1120,320)
    time.sleep(1)
    click(1750,650)
    print("clicked!")
