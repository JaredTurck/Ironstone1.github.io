import socket, time

s = socket.socket()
s.bind((socket.gethostname(), 80))
s.listen(1)
client, addr = s.accept()

def recvf(n):
    file = open("{0}.jpg".format(n), "wb")

    total, first = client.recv(1024).split(b":")

    chunk = int(total-1024) // 1024
    file.write(first)

    for i in range(chunk):
        file.write(client.recv(1024))

    file.write(client.recv(int(total) - chunks))

    
'''
count = 0
end = time.time() + 1
while time.time() < end:
    recvf(count)
    count += 1

print(count)'''
