import socket, time

serv = socket.socket()
serv.connect((socket.gethostname(), 80))
data = open("a.jpg", "rb").read()

length = len(data)
length = bytes(length + len(str(length)))

serv.send(length + b":" + data)
