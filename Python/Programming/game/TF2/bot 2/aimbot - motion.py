from PIL import ImageGrab
import win32api, win32con, time

size = ImageGrab.grab().size

def click(X, Y):
    win32api.SetCursorPos((X, Y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)

def attack():
    img1 = ImageGrab.grab().tobytes() # converting to bytes takes time
    img2 = ImageGrab.grab().tobytes()

    diffrent = []
    same = []

    for i in range(len(img1)): # far to slow
        if img1[i] != img2[i]:
            diffrent += [i]

        else:
            same += [i]

    if 1 <= len(diffrent) < ((len(diffrent) + len(same))-1):
        pos = diffrent[0]
        Y = pos // size[0]
        X = pos - (Y * size[0])

        click(X, Y)
        print("click!")

while True:
    end = time.time() +1
    FPS = 0
    while time.time() < end:
        attack()
        FPS += 1
    print(FPS)
