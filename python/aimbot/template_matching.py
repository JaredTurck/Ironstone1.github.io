from PIL import ImageGrab
from matplotlib import pyplot
import cv2
import numpy

#-Take screenshot of screen
#img = ImageGrab.grab().tobytes()

#-scan for pixel in that range (opencv).
#img = ImageGrab.grab().tobytes()
img = cv2.imread("img//frame_1.png", 0)
img2 = img.copy()
template = cv2.imread("img//source_1.png", 0)
w, h = template.shape[::-1]

methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
            'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']

for meth in methods:
    img = img2.copy()

    # match template
    res = cv2.matchTemplate(img, template, eval(meth))
    v_min, v_max, l_min, l_max = cv2.minMaxLoc(res)

    #
    if eval(meth) in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
        TopLeft = l_min
    else:
        TopLeft = l_max
    BottomRight = (TopLeft[0] + w, TopLeft[1] + h)

    cv2.rectangle(img, TopLeft, BottomRight, 255, 2)
    pyplot.subplot(121), pyplot.imshow(res, cmap = 'gray')
    pyplot.title('Matching Result'), pyplot.xticks([]), pyplot.yticks([])
    pyplot.subplot(122), pyplot.imshow(img, cmap = 'gray')
    pyplot.title('Detected Point'), pyplot.xticks([]), pyplot.yticks([])
    pyplot.suptitle(meth)
    pyplot.show()
    

#-If match, get the x,y pos of that pixel. 
#-Set mouse pos to that x,y pos.
#-Click
