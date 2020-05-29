import time, os, cv2, numpy, gc, threading
from PIL import ImageGrab

# 28 in 1 sec - with date written to HDD
# 30 in 1 sec - without saving bitmap

# to do
# - add multi threading so another thread managed writing of video to disk
# - mix colours
# - add shortcut key to stop recording

# multi threading is not being used if the pool,map function is taking 1.5 seconds to execute

# start - instead of using for loop, if user presses exit button, close program


class screen_recorder():
    def __init__(self):
        self.res_w = 1920
        self.red_h = 1080
        self.count = 0
        self.root_dir = os.path.dirname(os.path.realpath(__file__))
        self.frames = {}
        self.frame_counter = 0
        self.current_frame = 0
        self.filecounter = len([i for i in os.listdir(".") if os.path.isfile(i) and i.endswith(".avi")])
        self.avg_fps = int(self.benchmark(timeout=1, display=False)[1])
        self.vid_name = "vid_" + str(self.filecounter) + ".avi"
        self.video = cv2.VideoWriter(self.vid_name, 0, self.avg_fps-1, (self.res_w, self.red_h))
        self.exit = False
    
    def take_screenshot(self):
        self.frames[self.frame_counter] = ImageGrab.grab()
        self.frame_counter += 1

    def benchmark(self, timeout=1, display=True):
        count = 0
        end_loop = time.time() + (timeout)
        while time.time() < end_loop:
            self.take_screenshot()
            count += 1

        if display == True:
            print("Result:",count,"pixels in",timeout,"seconds!")
            print("Average:",count/timeout,"pixels per second!")
            
        return [timeout, count, count/timeout]

    def func_speed(self, func_name):
        start = time.time()
        eval("self."+func_name)
        return time.time() - start
        
    def write2video(self):
        while self.exit == False:
            for i in range(self.avg_fps):
                if self.current_frame in self.frames.keys():
                    self.video.write(cv2.cvtColor(numpy.array(self.frames[self.current_frame]), cv2.COLOR_RGB2BGR))
                    del self.frames[self.current_frame]
                    self.current_frame += 1
                    
            gc.collect()

        cv2.destroyAllWindows()
        self.video.release()
        gc.collect()
        

    def start(self, sec=1):
        threading.Thread(target = self.write2video).start()
        for i in range(sec):
            for i in range(self.avg_fps):
                self.take_screenshot()
        time.sleep(2)
        self.exit = True

r = screen_recorder()
r.start(sec=10)
