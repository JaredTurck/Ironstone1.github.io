import socket

servIP = "192.168.1.64"
DNS = "8.8.8.8"
log = []

def sendFile(f, r):
    client.sendall(open("contents/"+f, "r", encoding="utf-8").read())

def getData(byte):
    data = bytearray()
    while b"\r\n\r\n" not in data:
        data += client.recv(byte)

    return bytes(data.replace(b"\r\n\r\n",b""))

def processHeaders(request):
    request = request.replace(b" ",b"").decode("utf-8").split("\r\n")
    flags, data = {}, []
    
    for item in request:
        try: flags[item.split(":")[0]] = item.split(":")[1]
        except: data.append(item)

    if "GET" in data[0]:
        if "text/html" in flags["Accept"]: sendFile("index.html")
        if "image/webp" in flags["Accept"]: sendFile("img1.png")
    

s = socket.socket()
s.bind((servIP, 80))
s.listen(10)

while True:
    client, addr = s.accept()
    request = getData(1024)
    processHeaders(request)
    break
