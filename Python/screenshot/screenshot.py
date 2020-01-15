from PIL import ImageGrab
import os, datetime, time, tkinter

path = "D:/Pictures/screenshots"
file_extension = ".png"
timeout = 0.2
win = tkinter.Tk()
record = False

def take_screenshot():
    no_files = str(len(next(os.walk(path))[2]))
    date = (lambda x : "0".join([str(i) for i in [x.year, x.month, x.day]]))(datetime.datetime.now())

    img = ImageGrab.grab()
    img.save(path + "/" + date + "_" + no_files + file_extension)
    time.sleep(0.2)

def f1():
    global record
    record = True
    while record == True:
        take_screenshot()

def f2():
    global record
    record = False

B1 = tkinter.Button(win, text="Start", command = f1)
B1.pack()

B2 = tkinter.Button(win, text="Stop", command = f2)
B2.pack()
