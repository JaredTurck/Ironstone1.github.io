import socket, os, sys

# TCP/UDP
s = socket.socket()
s.connect((input("Enter the hosts address: "), 80))

name = s.recv(1024).replace(b"File Name:",b"").decode("utf-8")
print("Reciving file...")

file = open("file\\"+name, "wb")
data = s.recv(65536)

while data:
    file.write(data)
    data = s.recv(65536)

file.close()
s.close()
print("successfully recived the file!")
