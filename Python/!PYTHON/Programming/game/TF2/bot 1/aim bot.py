import win32api, win32con, time
from PIL import ImageGrab

file = ""
data = []

data = [(R,0,0) for R in range(120,256)]
print("Finished loading file!\nstarting bot...")

res = ImageGrab.grab().size


def click(X, Y):
    win32api.SetCursorPos((X, Y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)

while True:
    img = list(ImageGrab.grab().getdata())
    print("loaded next screenshot!")

    end = time.time() + 4
    while time.time() < end:
        
        for item in data:
            if item in img:
                pos = img.index(item)
                Y = pos // res[0]
                X = pos - (Y * res[0])

                for i in range(5):
                    click(X, Y)
                    time.sleep(.2)
                print("click at X={0} y={1}!".format(X, Y))
