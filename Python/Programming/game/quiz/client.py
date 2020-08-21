import socket, threading

def message(client, username):
    while True:
        data = bytearray(client.recv(1024))
        while b"\r\n" not in data:
            data += client.recv(1024)

        message = username+": ", data.decode("utf-8")[:-2]
        print(message)
        for i in clients:
            if i != username:
                clients[i].send(message)

def start():
    message(serv, "server")

addr = "192.168.56.1"
serv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serv.connect((addr, 80))

username = input("Enter a username: ")
while len(username) >= 1024:
    username = input("maximum length exceeded!\nEnter username: ")
serv.sendall(username.encode("utf-8"))
print("your connected to server!")

threading.Thread(target=start)
while True:
    serv.send(input(">>> ").encode("utf-8") + b"\r\n")
