import socket

request = {"HTML" : b'</HTML>\r\n', "GET" : b'\r\n\r\n'}
webserverIP = "151.101.1.69"
port = 80

def recv(Type, conn):
    data = bytearray()
    while request[Type] not in data:
        try: data += conn.recv(1024)
        except: None
        
    return bytes(data)

def pass_request(data):
    serv = socket.socket()
    serv.connect((webserverIP, port))
    serv.setblocking(False)
    serv.send(data)
    return recv("HTML", serv)

proxy = socket.socket()
proxy.bind(("192.168.1.64", 80))
proxy.listen(8)

client, addr = proxy.accept()
client.setblocking(False)

#GET = recv("GET", client)
#HTML = pass_request(GET)

#client.sendall(pass_request(recv("GET", client)))
