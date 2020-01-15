import socket

def time(loops, TimeOut, port):
    sec = (loops-port)*TimeOut
    
    Time = ("%d Min : %d Sec" % ((int(sec / 60) % 60), int(sec % 60)))
    Percent = ("%s percent complete..." % round((port / loops)*100))

    return "%s %s Remaining..." % (Percent, Time)

def scan(Host, Start, End, TimeOut=0.2):

    socket.setdefaulttimeout(TimeOut)
    Host = socket.gethostbyname(Host)
    Open = []

    print("Scanning [%s] for open TCP/UDP ports:"%(Host))
    for port in range(Start, End):
        if port % 50 == 0:
            print(time(End-Start, TimeOut, port))

        s = socket.socket()
        if s.connect_ex((Host, port)) == 0:
            Open.append(port)

    print("\nScan complete... from port %s to %s" % (Start, End))
    for port in Open:
        print("Reply from %s:%d Port %d is open!" % (Host, port, port))

def start():
    Host = print(open("menu.txt","r",encoding="utf-8").read())
    while Host != 0:
        try:
            s = socket.socket()
            Domain = input("Host: ")
            Host = s.connect_ex((Domain, 80))

            Start = int(input("Start port: "))
            end = int(input("End port: "))
        except:
            Host = print("Not a valid Host/port range!")

    return scan(Domain, int(Start), int(end), 0.01)
