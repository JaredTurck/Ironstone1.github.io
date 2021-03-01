from PIL import ImageGrab
from io import BytesIO
import time


def take_screenshot():
    img = ImageGrab.grab()
    buffer = BytesIO()
    img.save(buffer, "PNG", optimize=True, quality=10)

def func_speed(func_name):
    start = time.time()
    eval(func_name)
    return time.time() - start

def benchmark(timeout=1, display=True):
    count = 0
    end_loop = time.time() + (timeout)
    while time.time() < end_loop:
        take_screenshot()
        count += 1

    if display == True:
        print("Result:",count,"frames in",timeout,"seconds!")
        print("Average:",count/timeout,"frames per second!")

    return [timeout, count, count/timeout]

print(benchmark())

# FPS drops from 30 to 9 (due to the compression)
# image compression will need to be done on another thread

# compare uencrypted and encrypted

# save image to disk uncompressed
img = ImageGrab.grab()
img.save("img1.png")

#compress image, save in memory then show

#print(func_speed("img.resize((320,180))"))
#img = img.resize((320,180))

img = img.resize((320,180))

img.save(BytesIO(), "PNG", optimize=True, quality=20)
img.save("img2.png")

# capture image
# optimise image
# write image to ram

# timings
# resize            - 0.014002799987792969
# resize            - 0.015003442764282227
# save optimized    - 0.22405004501342773
# save optimized    - 0.22805094718933105

# optimize only reduce file size by a few kilobytes at most
# regardless of the quality settings 5 to 95.
# it is not worth running

# best way to reduce file size would be to down scale the images as they are written to the video
# then just upscale the whole video afterwards back to desired resolution.
# and also run through ffmpeg to reduce file size further?

