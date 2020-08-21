import socket, threading

def message(client, username):
    while True:
        data = bytearray(client.recv(1024))
        while b"\r\n" not in data:
            data += client.recv(1024)

        message = username+": " + data.decode("utf-8")[:-2]
        print(message)
        for i in clients:
            if i != username:
                clients[i].send(bytes(data) +b":"+ username.encode("utf-8"))

def get_client():
    client, addr = serv.accept()
    username = client.recv(1024).decode("utf-8")
    clients[username] = client
    print("{0}: {1} has connected!".format(username, addr))
    message(client, username)

host = "192.168.56.1"
serv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serv.bind((host, 80))
serv.listen(16)
clients = {}

for i in range(16):
    threading.Thread(target=get_client).start()
