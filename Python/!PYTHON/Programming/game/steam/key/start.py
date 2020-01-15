import random, win32com.client, win32api, win32con, time

shell = win32com.client.Dispatch("Wscript.Shell")
char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
entered = []

def gen(n):
    key = []
    for i in range(n):
        key.append("".join([char[random.randint(0,35)] for ii in range(5)]))

    return "-".join(key)

def click(X,Y):
    win32api.SetCursorPos((X,Y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)


def send(n):
    key = gen(n)
    shell.sendKeys("{BACKSPACE}"*len(key))
    shell.sendKeys(key)
    click(1750,365) # click next
    time.sleep(1)
    click(1650,365) # click back
