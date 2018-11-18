import cv2

img = cv2.imread("img//frame_1.png", 0)
template = cv2.imread("img//source_1.png", 0)

methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
            'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']

match = cv2.matchTemplate(img, template, eval(methods[0]))
