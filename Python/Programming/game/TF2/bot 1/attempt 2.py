import numpy, win32api, time
from PIL import Image, ImageGrab

def getEnemyPos(image):
    try:
        data = numpy.asarray(image)
        data_red = data[:,:,0]

        median_red = numpy.median(data_red)

        colum = numpy.where(data_red.max(axis=0)>median_red)[0]
        rows = numpy.where(data_red.max(axis=1)>median_red)[0]

        return (min(rows), max(rows), min(colum), max(colum))

    except:
        return None

while True:
    count = 0

    end = time.time() + 1
    while time.time() < end: # FPS
        
        photo = ImageGrab.grab() # get screenshot
        count += 1

        pos = getEnemyPos(photo)

        if pos != None:
            X, Y = (pos[0] + pos[2]) // 2, (pos[1] + pos[3]) // 2
            win32api.SetCursorPos((X,Y))
            print("Found enemy!")
