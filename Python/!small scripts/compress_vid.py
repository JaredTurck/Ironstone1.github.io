import os
from tkinter import filedialog
import tkinter

dialog = tkinter.Tk()
dialog.withdraw()

video_path = filedialog.askopenfilename()

def ask4filename():
        name = input("Enter output file name: ")
        while True in [" " in name, name[len(name)-4 : len(name)] != ".mp4"]:
                name = input("Invalid Input!\nEnter output file name: ")
        return name

name = str(len(os.listdir())) + ".mp4"
bit_rate = "2M"

print(os.popen('start ffmpeg' + ' -re -i "' + video_path +'" -b:v ' + bit_rate +' '+ name).read())

