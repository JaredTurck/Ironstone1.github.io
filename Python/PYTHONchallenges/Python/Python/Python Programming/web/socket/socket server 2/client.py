import socket

sock = socket.socket()
sock.connect((socket.gethostname(), 12345))

while True:
    print("[SERVER]: %s" % (sock.recv(1024).decode("utf-8")))
    sock.send(input(">>> ").encode("utf-8"))
