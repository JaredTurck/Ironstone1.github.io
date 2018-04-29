import win32api, win32con, win32gui, time, random

def click():
    x, y = random.randint(0,1920), random.randint(0,1080)
    win32api.SetCursorPos((x, y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

print("the auto clicker will start in....")
for i in range(0,10):
    time.sleep(1)
    print(str(10-i)+"...")
    
time.sleep(1)
print("go...")
    
while True:
    click()
    time.sleep(0.1)
