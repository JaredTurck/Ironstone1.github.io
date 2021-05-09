from PIL import Image
import PIL, time

def get_his(fname):
    im = Image.open(fname)
    width, height = im.size

    img = im.load()

    s = 0
    for x in range(width):
        for y in range(height):
            s += sum(img[x,y])
    return s / (width*height)

print("img 1", get_his("img1.png"))
print("img 2", get_his("img2.png"))
print("img 3", get_his("img3.png"))
print("img 4", get_his("img4.png"))
print("img 5", get_his("img5.png"))

def speed_test():
    start = time.time()
    for i in range(100):
        get_his("img1.png")

    return (time.time() - start) / 100
