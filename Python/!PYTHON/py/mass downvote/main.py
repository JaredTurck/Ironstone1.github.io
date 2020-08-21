import cv2
import numpy as np
import pyscreenshot as ImageGrab
import win32api, win32con

def get_location():
    # find profile pic
    image = np.array(ImageGrab.grab().convert("RGB"))
    template = cv2.imread("icon.png")
    result = cv2.matchTemplate(image,template,cv2.TM_CCOEFF_NORMED)
    x, y = np.unravel_index(result.argmax(),result.shape)

    # find down vote button
    template = cv2.imread("down_arrow.png")
    cropped = image[x : x + 300, 0 : -1]
    result = cv2.matchTemplate(cropped,template,cv2.TM_CCOEFF_NORMED)
    x2, y2 = np.unravel_index(result.argmax(),result.shape)

    return [x + x2, y + y2]
    

def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

def downvote():
    y, x = get_location()
    click(x-390, y+5)

#click((lambda n : [n[0]+5,n[1]+5])(get_location()))
#click((lambda n : [n[0],n[1]])(get_location()))

# - issues
# does not work if the comment is in a chain
# if there are multiple matchs in the cropped image, it picks the last one
# web browser window must be full screen
