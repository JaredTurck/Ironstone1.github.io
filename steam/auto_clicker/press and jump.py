import subprocess, os, time, win32api, win32con

def click(x,y):
    win32api.SetCursorPos((x, y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

while True:
    time.sleep(2)
    subprocess.Popen('"D:\Steam\steamapps\common\Press and Jump\game.exe"')
    print("[+] game launched...")

    for i in range(2):
        time.sleep(3)
        click(1050, 720)
    
    time.sleep(5)
    os.system('taskkill /f /im game.exe')
    print("[-] game ended...")
