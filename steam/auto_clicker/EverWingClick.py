import win32api, win32con, time, random

def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)
    print(x, y)

print("Open EverWing...")
time.sleep(5)

while True:
    time.sleep(2)
    click(650,800)
    time.sleep(2)
    click(600,850)

    win32api.SetCursorPos((random.randint(500,900),800))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,random.randint(500,900),800,800,0)
    win32api.SetCursorPos((random.randint(500,900),800))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,random.randint(500,900),800,0)

'''
click(650,800) // start game

click(850,300) // close window
click(850,220)

//loop
click(650,800)
click(600,850)
'''
