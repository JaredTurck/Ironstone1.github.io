from PIL import ImageGrab
import os, keyboard, time, winsound

key = "F2"
#pic_dir = os.path.expanduser("~/Pictures").replace('\\','/')
pic_dir = "D:/OneDrive/Pictures/Uplay/Assassin's Creed® Valhalla"
timeout = 0.01

while True:
    if keyboard.is_pressed(key):
        fname = time.ctime().replace(':','-').replace(' ','_')
        path = pic_dir + "/img_"+fname+".png"
        ImageGrab.grab().save(path)
        print("[+] saved in '"+path+"'!")
        winsound.Beep(2500, 100)
        while keyboard.is_pressed(key): pass
    else:
        time.sleep(timeout)
