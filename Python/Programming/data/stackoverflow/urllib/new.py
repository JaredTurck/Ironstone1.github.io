#import urllib.request
#data = urllib.request.urlopen("https://www.spriters-resource.com/download/6866/").read()

    import socket
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(("spriters-resource.com", 80))
    s.send(b"GET /download/6866/ HTTP/1.0\r\nHOST: spriters-resource.com\r\n\r\n")

    data = bytearray(s.recv(1024))
    while b"\r\n\r\n" not in data:
        data += s.recv(1024)

    file = bytes(data)
