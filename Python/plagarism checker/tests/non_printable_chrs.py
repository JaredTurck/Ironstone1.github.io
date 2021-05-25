from PIL import ImageGrab
import time, win32api, win32con

def click(x, y):
    win32api.SetCursorPos((x, y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

start = 8200
end = 1114111
invisible_chrs = []
check_range_width = 20
check_range_height = 10

def test():
    inv_chr_test = u'\u200e' # 8206

    # screenshot
    img = ImageGrab.grab()
    px_values = []
    for i in range(check_range_width):
        for ii in range(check_range_height):
            px_values.append(img.getpixel(( pixel_cood[0]-i, pixel_cood[1]-ii )))
            px_values.append(img.getpixel(( pixel_cood[0]+i, pixel_cood[1]+ii )))
            px_values.append(img.getpixel(( pixel_cood[0]-i, pixel_cood[1]+ii )))
            px_values.append(img.getpixel(( pixel_cood[0]+i, pixel_cood[1]-ii )))

    # check if invisible
    uvalues = list(set(px_values))
    print(f"no. colours {len(uvalues)}")
    if (len(uvalues) == 1):
        return True
    else:
        return False

def print_invisible_chrs():
    [print("'"+chr(i)+"'", end=", ") for i in invisible_chrs]

# move mouse
print("please move your mouse to the last line of IDLE!\n\n")
time.sleep(5)
pixel_cood = win32api.GetCursorPos()

#while test() == False:
#    print(f"Please Move mouse! {pixel_cood[0]}, {pixel_cood[1]}\n\n")
#    time.sleep(1)
#    pixel_cood = win32api.GetCursorPos()
win32api.SetCursorPos((1000, 995))

time.sleep(2)
for current_chr in range(start, end+1):
    start_time = time.time()
    
    # print char
    print(chr(current_chr))

    # screenshot
    img = ImageGrab.grab()

    px_values = []
    for i in range(check_range_width):
        for ii in range(check_range_height):
            px_values.append(img.getpixel(( pixel_cood[0]-i, pixel_cood[1]-ii )))
            px_values.append(img.getpixel(( pixel_cood[0]+i, pixel_cood[1]+ii )))
            px_values.append(img.getpixel(( pixel_cood[0]-i, pixel_cood[1]+ii )))
            px_values.append(img.getpixel(( pixel_cood[0]+i, pixel_cood[1]-ii )))

    # check if invisible
    uvalues = list(set(px_values))
    if (len(uvalues) == 1):
        if list(set(uvalues[0])) == [255]:
            # the chr is invisible
            invisible_chrs.append(current_chr)

    # print
    end_time = time.time()
    pcnt = round((current_chr / end) * 100, 2)
    time_left = ((end - current_chr) * (end_time - start_time)) / 60
    print(f"\n\n\tchecked {current_chr}/{end} characters! {pcnt}% {time_left} mins left!\n\n")
