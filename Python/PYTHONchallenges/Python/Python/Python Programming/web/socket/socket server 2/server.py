import socket

sock = socket.socket()
sock.bind((socket.gethostname(), 12345))
sock.listen(16)

client, IP = sock.accept()
print("Client '%s' just connected" % (IP[0]))
client.send(b"Wellcome to your chat server!")

while True:
    client.send(input(">>> ").encode("utf-8"))
    print("[CLIENT]: %s" % (client.recv(1024).decode("utf-8")))

