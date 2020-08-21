import tkinter, time
from PIL import Image, ImageTk


root = tkinter.Tk()

photo = ImageTk.PhotoImage(Image.open("Tulips.jpg"))
label = tkinter.Label(root, image = photo)
label.pack()

def update():
    photo = ImageTk.PhotoImage(Image.open("Tulips.jpg"))
    label.image = photo
    label.configure(image = photo)
    label.pack()
