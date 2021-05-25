import cv2, numpy
from PIL import ImageGrab
from io import BytesIO

video = cv2.VideoWriter("vid1.avi", 0, 30, (1920, 1080))
video2 = cv2.VideoWriter("vid2.avi", 0, 30, (320, 180))

# captures the frame
frame1 = ImageGrab.grab()

# write frame unoptimized to video (in it's original size)
video.write(cv2.cvtColor(numpy.array(frame1), cv2.COLOR_RGB2BGR))

# frame is resized
frame1 = frame1.resize((320,180))

# optimizes then overwrites the frame in memory
frame1.save(BytesIO(), "PNG", optimize=True, quality=20)

# frame is written to video from memory
video2.write(cv2.cvtColor(numpy.array(frame1), cv2.COLOR_RGB2BGR))

# release the videos
cv2.destroyAllWindows()
video.release()
video2.release()

# resize frame small
