from PIL import ImageGrab
import cv2, numpy, time, os

def record_screen(FileName, FPS=20.0, show=False):
    print("started screen capture!")
    resolution = ImageGrab.grab().size
    
    fourcc = cv2.VideoWriter_fourcc(*"XVID")
    out = cv2.VideoWriter(FileName, fourcc, FPS, resolution)
    seconds = 0

    try:
        while True:
            end = time.time() +1
            while time.time() < end:
                frame = ImageGrab.grab().convert("RGB")
                frame = (numpy.array(frame))[:,:, ::-1].copy()
                time.sleep(.02)

                out.write(frame)
                [cv2.imshow("frame",frame) if show == True else None]

                if cv2.waitKey(1) & 0xff == 27:
                    break
            seconds += 1
            mins = seconds // 60
            secs = seconds - (mins * 60)
            
            os.system("cls")
            print("RECORDING: {0}:{1}".format(mins, secs))
            
    finally:
        print("Finished recording!")
        
    out.release()
    cv2.destroyAllWindows()

record_screen(input("File Name: "))
