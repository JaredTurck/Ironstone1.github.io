import socket, sys, os

IP = socket.gethostbyname("google.com")
count = 0

while True:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((IP, 80))
    s.send(b"GET / HTTP/1.1")
    count += 1
    print("send GET!")
