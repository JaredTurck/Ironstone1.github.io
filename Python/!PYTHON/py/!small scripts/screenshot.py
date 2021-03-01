from PIL import ImageGrab
import os, keyboard, time

key = "F2"
pic_dir = os.path.expanduser("~/Pictures").replace('\\','/')
#pic_dir = "D:/OneDrive/Pictures/Screenshots"

while True:
    if keyboard.is_pressed(key):
        fname = time.ctime().replace(':','-').replace(' ','_')
        path = pic_dir + "/img_"+fname+".png"
        ImageGrab.grab().save(path)
        print("[+] saved in '"+path+"'!")
        while keyboard.is_pressed(key): pass
