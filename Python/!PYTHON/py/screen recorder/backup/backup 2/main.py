import win32gui, win32ui, win32con, time, os, cv2, glob

# 28 in 1 sec - with date written to HDD
# 30 in 1 sec - without saving bitmap

class screen_recorder():
    def __init__(self):
        self.res_w = 1920
        self.red_h = 1080
        self.count = 0
        self.root_dir = os.path.dirname(os.path.realpath(__file__))
        self.img_folder = "img"
    
    def take_screenshot(self):
        pass

    def take_speedshot_2(self):
        pass


    def benchmark(self, timeout=1):
        count = 0
        end_loop = time.time() + (timeout)
        while time.time() < end_loop:
            self.take_screenshot()
            count += 1

        print("Result:",count,"pixels in",timeout,"seconds!")
        print("Average:",count/timeout,"pixels per second!")
        return [timeout, count, count/timeout]

    def func_speed(self):
        start = time.time()
        self.take_screenshot()
        return time.time() - start

    def start(self):
        while True:
            self.take_screenshot()

    def convert2video(self):
        vid_name = "video1.avi"

        images = sorted([i for i in os.listdir(self.img_folder) if i.endswith(".bmp")])
        frame = cv2.imread(os.path.join(self.img_folder, images[0]))
        
        video = cv2.VideoWriter(vid_name, 0, 1, (frame.shape[1], frame.shape[0]))
        for image in images:
            video.write(cv2.imread(os.path.join(self.img_folder, image)))

        cv2.destroyAllWindows()
        video.release()

        #delete all img's after finished recording
        for f in glob.glob(os.path.join(self.root_dir, self.img_folder)):
            os.remove(f)

r = screen_recorder()
#r.start()
