import socket

sock = socket.socket()
sock.connect((socket.gethostname(), 12345))
print(sock.recv(1024))
sock.close()
