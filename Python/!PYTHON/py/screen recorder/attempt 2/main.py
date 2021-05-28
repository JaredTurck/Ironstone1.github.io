from PIL import ImageGrab, Image
from zlib import compress
import time, os, cv2, numpy, io

avg_fps = 24
res_w = 1920
res_h = 1080
vid_name = "output.avi"
video = cv2.VideoWriter(vid_name, 0, avg_fps-1, (int(res_w), int(res_h)))

for i in range(1):
    current_frame = compress(ImageGrab.grab().tobytes(), 9)

    opened = Image.open(io.BytesIO(current_frame))

    output = cv2.cvtColor(numpy.array(opened), cv2.COLOR_RGB2BGR)
    
    video.write(output)

    print(True)

cv2.destroyAllWindows()
video.release()
