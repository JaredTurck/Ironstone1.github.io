import urllib.request, socket

def recv_data(conn):
    data = bytearray()
    while b'\r\n' not in data:
        data += conn.recv(1024)
    return bytes(data)

def get_html(GET):
    url = "204.79.197.200" # bing ip
    redirect = socket.socket()
    redirect.connect((url, 80))
    redirect.sendall(GET)
    return recv_data(redirect)

serv = socket.socket()
serv.bind(("192.168.1.64", 80))
serv.listen(1)

while True:
    client, addr = serv.accept() # accept client
    request = recv_data(client) # GET request
    client.sendall(get_html(request)) # send HTML
