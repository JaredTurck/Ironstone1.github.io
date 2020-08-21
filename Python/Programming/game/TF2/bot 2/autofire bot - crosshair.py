from PIL import ImageGrab
import time

X, Y = ImageGrab.grab().size
start = (255, 0, 0)
end   = (100, 150, 150) # G == B - allow 10 pixel gap

def check(colors):
    R,G,B = colors
    valid = []
    valid += [start[0] <= R <= end[0]]
    valid += [start[1] <= G <= end[1]]
    valid += [start[2] <= B <= end[2]]
    valid += [0 <= (max(G,B)-min(G,B)) <= 10]

    return all(valid)

def click(X,Y):
    win32api.SetCursorPos((X, Y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)
    print("found enemy!")

while True:
    FPS = 0
    END = time.time() + 1
    while time.time() < END:
        img = ImageGrab.grab()
        mid = (X // 2, Y // 2) # mid always white
        FPS += 1

        if check(img.getpixel(mid)) == True:
            click(X,Y)

    print(img.getpixel(mid))
