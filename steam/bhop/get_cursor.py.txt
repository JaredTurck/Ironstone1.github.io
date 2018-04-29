import win32api, time

def get_pos():
    x1, y1 = win32api.GetCursorPos()
    time.sleep(0.001)
    x2, y2 = win32api.GetCursorPos()
    
    pos = x1-x2
    if pos > 0:
        return "left"
    elif pos < 0:
        return "right"

time.sleep(10)
while True:
    if (get_pos() == "left"):
        for i in range(200): win32api.keybd_event(32, 0)
        for i in range(200): win32api.keybd_event(65, 0)

    if (get_pos() == "right"):
        for i in range(200): win32api.keybd_event(32, 0)
        for i in range(200): win32api.keybd_event(68, 0)

# win32api.keybd_event(65, 0)       press A
# win32api.keybd_event(68, 0)       press D
# win32api.keybd_event(32, 0)       press space
