import socket
port = socket.socket()
port.bind((socket.gethostname(), 80))
