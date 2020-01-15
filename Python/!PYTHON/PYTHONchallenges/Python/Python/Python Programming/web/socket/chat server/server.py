import socket

class sock():
    def server(host, port):
        sock = socket.socket()
        sock.bind((host, port))
        sock.listen(1)

        client, addr = sock.accept()

        print(client.recv(5012))

        #text = input(">>> ")
        #client.send(text.encode("utf-8"))
        client.close()
        sock.close()

    def client(Host_IP, port):
        sock = socket.socket()
        sock.connect((Host_IP, 12345))

        print(sock.recv(1024))

port = 80
Host = "192.168.1.71"

sock.server(Host, port)
#sock.client(Host, port)
