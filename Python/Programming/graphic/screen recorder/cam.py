import cv2

def record(FileName, FPS=20.0, resolution=(640, 480)):
    cam = cv2.VideoCapture(0)
    out = cv2.VideoWriter(FileName, -1, FPS, resolution)

    while True:
        ret, frame = cam.read()
            
        out.write(frame)
        cv2.imshow("frame", frame)

        if cv2.waitKey(1) & 0xFF == 27:
            break

    cam.release()
    out.release()
    cv2.destroyAllWindows()
