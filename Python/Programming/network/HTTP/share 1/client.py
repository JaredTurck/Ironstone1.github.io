import socket

# client
serv = socket.socket()
serv.connect((socket.gethostname(),80))
print("sucessfully connected to server!")

while True: # send
    message = input("%s: " % socket.gethostname())
    length = serv.send(("%05d" % len(message)).encode("utf-8"))
    serv.send(message.encode("utf-8"))
