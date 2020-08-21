import socket, os, io

def scan(Domain, PortRange, Max, TimeOut=0.2):
    socket.setdefaulttimeout(TimeOut)
    Host = socket.gethostbyname(Domain)
    ports, portN = [], 0
    print("Scanning [%s] for open TCP/UDP ports:" % (Host))

    for port in PortRange:
        if (port / Max)*100 in[(i / Max)*100 for i in range(0,Max,int(Max/100))]:
            print("%d percent compleate... found %d open ports!" %(portN,len(ports)))
            portN += 1
        
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        if s.connect_ex((Host, port)) == 0:
            ports.append(port)

    print("\nScan Complete...")
    for i in ports:
        print("Reply from %s:%d Port %d is open!" %(Host,i,i))

file = io.open("menu.txt", "r", encoding="utf-8").read()
Host = print(file)

while Host !=True:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        HostName = input("Server/Host: ")
        if s.connect_ex((HostName, 80)) == 0:
            A, B = input("start port: "), input("end port: ")
            if (A+B).isdigit() == True:
                Host = True
            else:
                print("Not a valid Port Range!")

    except:
        print("Not a valid Host Name!")

scan(HostName,range(int(A),int(B)), int(B))
