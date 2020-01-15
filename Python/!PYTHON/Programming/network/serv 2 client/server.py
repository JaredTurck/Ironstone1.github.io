import socket, tkinter, time
from PIL import Image, ImageTk

# join network - socket
print("waiting for client to join...")
s = socket.socket()
s.bind((socket.gethostname(), 80))
s.listen(1)
client, address = s.accept()

def screenshot():
    client.send(b"SCREENSHOT")
    file = open("NextFrame.png", "wb")

    data = b""
    while b"END" not in data:
        file.write(client.recv(1024).replace(b"END",b""))

print("Setting up screen...")
screenshot()
time.sleep(5)
root = tkinter.Tk()

photo = ImageTk.PhotoImage(Image.open("NextFrame.png"))
label = tkinter.Label(root, image = photo)
label.pack()

print("executing main loop...")
while True:
    screenshot()
    time.sleep(0.2)
    photo = ImageTk.PhotoImage(Image.open("NextFrame.png"))
    label.image = photo
    label.configure(image = photo)
    label.pack()
