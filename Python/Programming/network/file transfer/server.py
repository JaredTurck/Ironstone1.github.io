import socket, tkinter, os
from tkinter import filedialog

print("waiting for client to respond...")
s = socket.socket()
s.bind((socket.gethostname(), 80))
s.listen(1)
client, addr = s.accept()

# file dialog
print("select the file to be sent...")
root = tkinter.Tk()
root.withdraw()
path = filedialog.askopenfilename()
name = path.split("/")[-1]

client.send(b"File Name:" + bytes(name, "utf-8"))
file = open(path, "rb")

# send file to client
print("Please wait, while the file is sent...")
data = file.read(65536)

while data:
    client.send(data)
    data = file.read(65536)

file.close()
client.close()
print("sucessfully sent the file!")
