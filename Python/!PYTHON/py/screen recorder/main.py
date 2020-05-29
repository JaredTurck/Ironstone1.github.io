import time, os, cv2, numpy, gc, threading
from PIL import ImageGrab, Image
from io import StringIO

# 28 in 1 sec - with date written to HDD
# 30 in 1 sec - without saving bitmap
# recorded for 2:53 mins at 0.01 timeout

# to do
# - add multi threading so another thread managed writing of video to disk              done
# - mix colours                                                                         done
# - add shortcut key to stop recording
# - start, instead of using for loop, if user presses exit button, close program


class screen_recorder():
    def __init__(self):
        self.res_w = 1920
        self.red_h = 1080
        self.count = 0
        self.root_dir = os.path.dirname(os.path.realpath(__file__))
        self.frames = {}
        self.frame_counter = 0
        self.current_frame = 0
        self.between_frames_timeout = 0.01
        self.filecounter = len([i for i in os.listdir(".") if os.path.isfile(i) and i.endswith(".avi")])
        self.avg_fps = int(self.benchmark(timeout=1, display=False)[1])
        self.vid_name = "vid_" + str(self.filecounter) + ".avi"
        self.video = cv2.VideoWriter(self.vid_name, 0, self.avg_fps-1, (self.res_w, self.red_h))
        self.exit = False
        self.error_timeout = 0.1
        self.error_count = 0

    def reset(self):
        self.frames = {}
        self.frame_counter = 0
        self.current_frame = 0
        self.error_count = 0
        gc.collect()

    def error_handler(self, ErrorText):
        print(ErrorText)
        gc.collect()
        time.sleep(self.error_timeout)
        self.error_count += 1
        if self.error_count >= 5:
            self.reset()
            print("[-] Error has occured multiple times, frame buffer will be cleared!")
            print("[-] About 1 second of the video will be lost!")
            exit() # delete this................
    
    def take_screenshot(self):
        try:
            self.frames[self.frame_counter] = ImageGrab.grab()
            self.frame_counter += 1
            time.sleep(self.between_frames_timeout)
        except MemoryError:
            self.error_handler("[-] Memory Overflow error, some frames will be missed!")
        
    def benchmark(self, timeout=1, display=True):
        count = 0
        end_loop = time.time() + (timeout)
        while time.time() < end_loop:
            self.take_screenshot()
            count += 1

        if display == True:
            print("Result:",count,"frames in",timeout,"seconds!")
            print("Average:",count/timeout,"frames per second!")

        self.reset()
        return [timeout, count, count/timeout]

    def func_speed(self, func_name):
        start = time.time()
        eval("self."+func_name+"()")
        return time.time() - start
        
    def write2video(self):
        for i in range(self.avg_fps):
            if self.current_frame in self.frames.keys():
                self.video.write(cv2.cvtColor(numpy.array(self.frames[self.current_frame]), cv2.COLOR_RGB2BGR))
                del self.frames[self.current_frame]
                self.current_frame += 1
                
        gc.collect()

    def write2video_loop(self):
        while self.exit == False:
            try:
                self.write2video()
            except:
                self.error_handler("[-] Out of memory error, failed to write some frames to disk!")

        # cleanup
        cv2.destroyAllWindows()
        self.video.release()
        self.reset()

    def start(self, sec=1):
        threading.Thread(target = self.write2video_loop).start()
        for i in range(sec):
            for i in range(self.avg_fps):
                self.take_screenshot()
        time.sleep(2)
        self.exit = True

r = screen_recorder()
#r.start(sec=600)
