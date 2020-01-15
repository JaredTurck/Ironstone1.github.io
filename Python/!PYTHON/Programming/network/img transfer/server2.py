import socket, os, tkinter
from tkinter import filedialog

root = tkinter.Tk()
root.withdraw()

class node(object):
    def __init__(self, nodeType):
        self.port = 80
        self.addr = socket.gethostname()
        if nodeType == "client":
            self.node = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.node.connect((self.addr, self.port))
            
        if nodeType == "server":
            self.serv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.serv.bind((self.addr, self.port))
            self.serv.listen(5)
            self.node, self.addr = self.serv.accept()
    
    def recv_file(self):
        file = bytearray(self.node.recv(1024))
        while b"\r\n\r\n" not in file:
            file += self.node.recv(1024)

        print("File recived, please save using the save as dialog!")
        name = tkinter.filedialog.asksaveasfilename()
        with open(name, "wb") as f:
            f.write(bytes(file))

    def send_file(self):
        name = tkinter.filedialog.askopenfilename()
        self.node.sendall(open(name, "rb").read() + b"\r\n\r\n")
        print("The file was successfully sent!")
