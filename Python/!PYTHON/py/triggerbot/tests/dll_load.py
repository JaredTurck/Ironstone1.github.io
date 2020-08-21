import ctypes, time

def get_pixel(x,y,count=1):
    user= ctypes.WinDLL("c:\\Windows\\system32\\user32.dll")
    h = user.GetDC(0)
    gdi= ctypes.WinDLL("c:\\Windows\\system32\\gdi32.dll")

    pixels = []
    for i in range(count):
        pixels.append(gdi.GetPixel(h,0,i))
    return pixels

def benchmark(timeout=1):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        get_pixel(0,0)
        count += 1

    print("Result:",count,"pixels in",timeout,"seconds!")
    print("Average:",count/timeout,"pixels per second!")
    return [timeout, count, count/timeout]

# gdi.GetPixel(h,0,i) - 60 in 1 sec
# 16.6 milliseconds per pixel
