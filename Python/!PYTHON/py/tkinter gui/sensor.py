
# incomming packets are logged to tkinter window
# button to send data to sensor
# - time update (sncs all the sensors internal clock)
# - send other data to sensor

import tkinter
from PIL import ImageTk, Image

btn1 = lambda : print("Button1")
btn2 = lambda : print("Button2")
btn3 = lambda : print("Button3")

class GUI():
    def __init__(self):
        self.row_counter = 0
        self.font = "Arial"
        self.font_size = 16
        self.colour = "black"
        self.pos = "center"
        self.canvas = tkinter.Tk()
        self.row_counter = 0
        self.column_counter = 0
        self.button_width = 30

    def add_title(self, txt, padding = (0, 0)):
        title = tkinter.Label(self.canvas, fg=self.colour, anchor=self.pos)
        title.config(font=(self.font, self.font_size), text=txt)
        title.grid(row=self.row_counter,
            column=self.column_counter,
            padx=padding[0],
            pady=padding[1],
            sticky=tkinter.W)
        self.row_counter += 1

    def add_button(self, txt, callback, padding = (0, 0)):
        button = tkinter.Button(self.canvas, text=txt, command=callback)
        button.config(width=self.button_width)
        button.grid(row=self.row_counter,
            column=self.column_counter,
            padx=padding[0],
            pady=padding[1],
            sticky=tkinter.W)
        self.row_counter += 1

    def add_image(self, url, padding = (0, 0)):
        img = ImageTk.PhotoImage(Image.open(url))
        im = tkinter.Label(self.canvas, image = img)
        #im.pack(side = "bottom", fill = "both", expand="yes")
        im.grid(row=self.row_counter,
            column=self.column_counter,
            padx=padding[0],
            pady=padding[1],
            sticky=tkinter.W)
        
        self.row_counter += 1

    def main(self):
        self.add_title("Hello World", (70, 20))
        self.add_button("Button 1", btn1, (20, 2))
        self.add_button("Button 2", btn2, (20, 2))
        self.add_button("Button 3", btn3, (20, 2))
        self.add_image("cat.jpg")

g = GUI()
g.main()
