import cv2, numpy, win32api, win32con, time
from PIL import Image, ImageGrab

def shoot(X,Y):
    win32api.SetCursorPos((X,Y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,X,Y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,X,Y,0,0)

#def Get_Enemy_Position():
while True:
    # take screenshot
    img = ImageGrab.grab().convert("RGB")
    img = (numpy.array(img))[:,:, ::-1].copy()


    # find enemy by color range
    dark = numpy.array([0,20,120],numpy.uint8) # red enemy
    light = numpy.array([255,50,255],numpy.uint8)
    red = cv2.inRange(img,dark,light)

    img = cv2.bitwise_and(img, img, mask = red)

    # define edge
    edge = cv2.Canny(img, 100, 200)

    # find largest contour
    a,b = cv2.threshold(edge, 127, 255, cv2.THRESH_BINARY)
    contour = cv2.findContours(b, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    enemy = max(contour[1], key = cv2.contourArea).tolist()
    print(enemy)

    if len(enemy) >= 10:
        try:
            X,Y = enemy[0][0]
            shoot(X,Y)
            print("shoot!")
        except:
            pass

    time.sleep(.5)
