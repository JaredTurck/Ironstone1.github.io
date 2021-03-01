import socket, time, win32gui, keyboard, threading

class chat():
    def __init__(self):
        self.my_ip = "127.0.0.1"
        self.friends_ip = "127.0.0.1"
        self.port = 80
        self.active_win = "py.exe"
        self.config = "IPs.txt"
        self.encoding = "utf-8"

    def print_message(self, addr, data):
        """ prints sent/received message """
        current_time = time.strftime("%H:%M:%S", time.gmtime())
        text = data.decode(self.encoding)
        if text[-4:] == '\r\n\r\n':
            text = text[:-4]
        if type(addr) != str:
            addr = addr[0]
            
        print("["+str(addr)+"]["+current_time+"] "+text)

    def read_config(self):
        try:
            data = open(self.config, "r", encoding=self.encoding).read()
            data = data.replace('\n','').replace(':','')
            if "my_ip" in data and "friends_ip" in data:
                self.my_ip = data.split('my_ip')[1].split('friends_ip')[0]
                self.friends_ip = data.split('friends_ip')[1]
            else:
                raise FileNotFoundError('File is in an invalid format!')
                
        except FileNotFoundError:
            with open(self.config, "w") as file:
                file.write("my_ip:127.0.0.1\nfriends_ip:127.0.0.1")

    def get_data(self, con):
        """ Waits for all data to be received """
        data = con.recv(1024)
        while b"\r\n\r\n" not in data:
            data += con.recv(1024)
        return data

    def get_keystrokes(self, end="\n"):
        """ Gets users keystrokes """
        title = win32gui.GetWindowText(win32gui.GetForegroundWindow())
        if self.active_win in title:
            keystrokes = keyboard.record(end)
            text = []
            for key in keystrokes:
                if key.event_type == "down":
                    if key.name != None:
                        if len(key.name) == 1:
                            text.append(key.name)
                        elif key.name == "tab":
                            text.append("\t")
                        elif key.name == "backspace":
                            text = text[:-1]
                        elif key.name == "space":
                            text.append(" ")
            return "".join(text)
        else:
            return ""
                

    def server(self):
        """ Receive messages """
        self.read_config()
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(3600)
        s.bind((self.my_ip, self.port))
        s.settimeout(None)
        s.listen()
        print("Your IP is: " + self.my_ip)

        while True:
            con, addr = s.accept()
            self.print_message(addr, self.get_data(con))

    def client(self):
        """ Send messages """
        self.read_config()
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(3600)
        s.connect((self.friends_ip, self.port))
        s.settimeout(None)
        print("Connected to: " + self.friends_ip)

        while True:
            message = self.get_keystrokes().encode(self.encoding)
            if len(message) > 1:
                s.sendall(message)
                self.print_message("Sent", message)
    

#http://127.0.0.1:8080/
                
c = chat()
server = threading.Thread(target=c.server)
client = threading.Thread(target=c.client)

server.start()
client.start()
