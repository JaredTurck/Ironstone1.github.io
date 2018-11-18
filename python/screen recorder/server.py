import socket
from PIL import ImageGrab

def recv_data(send):
    data = send.recv(1024)
    if b"\r\n\r\n" not in data:
        data += send.recv(1024)

    return data

s = socket.socket()
host = socket.gethostbyname(socket.gethostname())
print(host)

s.bind((host, 80))
s.listen(1)
#assert False

while True:
    con, ip = s.accept()
    data = recv_data(con)
    print("\n",data)

    if b"GET / HTTP" in data[0:10]:
        #con.send(b"<html><img src=\""+host.encode("utf-8")+b"/new.jpg\"></html>\r\n\r\n")
        #con.send(open("index.html", "rb").read())
        
        con.send(open("index.html", "rb").read().replace(b"{SRC}", host.encode("utf-8")))
        con.close()

    else:
        #img = ImageGrab.grab()
        #con.send(img.tobytes())

        ImageGrab.grab().save("new.jpg")
        con.send(open("new.jpg", "rb").read())
        con.close()

        
        
