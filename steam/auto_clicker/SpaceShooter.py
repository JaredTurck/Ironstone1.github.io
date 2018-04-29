import win32api, win32con, time, random

print("the auto clicker will start in....")
for i in range(0,5):
    time.sleep(1)
    print(str(10-i)+"...")
    
time.sleep(1)
print("go...")
    
while True:
    for i in range(50):
        x, y = random.randint(0,1920), random.randint(0,1080)
        win32api.SetCursorPos((x, y))
        time.sleep(0.01)
    win32api.SetCursorPos((1000, 500))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,1000,500,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,1000,500,0,0)
    time.sleep(0.2)
