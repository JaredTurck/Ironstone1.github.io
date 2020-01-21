import time, cv2, os
from PIL import ImageGrab

def start_capture():
    no_frames = 0
    if not os.path.exists("temp_img"):
        os.makedirs("temp_img")
    
    while True:
        fps = 0
        start = time.time()
        while time.time() < (start+1):
            img = ImageGrab.grab()
            img.save("temp_img/"+str(no_frames)+".png")
            fps += 1
            no_frames += 1

        print("fps:",fps)


def merge_frames():
    folder = "temp_img"

    image = [i for i in os.listdir(folder) if i.endswith(".png")]
    h,w,l = cv2.imread(os.path.join(folder, image[0])).shape

    video = cv2.VideoWriter( "vid_" + str(len(list(os.listdir())))+".avi", 0, 1, (w,h))

    for img in image:
        video.write(cv2.imread(os.path.join(folder, img)))
        os.remove(os.path.join(folder, img))

    cv2.destroyAllWindows()
    video.release()
    os.rmdir(folder)

print("Started recording...\n Press CTRL + C to stop\n")
try:
    start_capture()
    
except KeyboardInterrupt:
    merge_frames()
