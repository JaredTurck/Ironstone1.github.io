import socket, time

class net(object):
    def __init__(self):
        pass

    def scan_range():
        ''' Starts Brutal Force attack on a host, searching for open ports'''
        while True:
            try:
                host = input("Enter your host: ")
                hostIP = socket.gethostbyname(host)
                break
            except:
                Time = time.strftime("%H:%M:%S")
                print("%s [CONSOLE] Failed to obtain IP! please try again." % Time)

        START = STOP = str(print("Please specifie a port range:"))
        while (START + STOP).isdigit() != True:
            START = input("START: ")
            STOP = input("END: ")
            if (START + STOP).isdigit() != True:
                print("Not a valid Input!")
        PortRange = range(int(START), int(STOP))
            

        print("Stating Brutal Force on [%s]..." % hostIP)
        for port in PortRange:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            conn = s.connect_ex((host, port))

            Time = time.strftime("%H:%M:%S")
            if conn == 0:
                print("%s [CONSOLE] Port %s is open!" % (Time,port))
            else:
                print("%s [CONSOLE] Port %s is closed!" % (Time,port))

