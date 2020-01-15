import tkinter

win = tkinter.Tk()

def f1():
    print("hi")

def f2():
    print("hi2")

B1 = tkinter.Button(win, text="Start", command = f1)
B1.pack()
B2 = tkinter.Button(win, text="Stop", command = f2)
B2.pack()
