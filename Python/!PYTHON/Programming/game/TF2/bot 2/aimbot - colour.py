from PIL import ImageGrab, Image
import cv2, numpy

#ImageGrab.grab()
F = cv2.imread("screenshot\\1.jpg") # open image
img = cv2.cvtColor(F, cv2.COLOR_BGR2HSV) # convert to HSV

start = numpy.array([110,50,50])
end = numpy.array([130,255,255])

mask = cv2.inRange(img, start, end)

res = cv2.bitwise_and(img, img, mask=mask)

cv2.imshow("frame", img)
