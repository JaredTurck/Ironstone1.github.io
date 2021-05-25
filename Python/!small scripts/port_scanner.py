import socket

def scan(port_range, host):
    s = socket.socket()
    for port in port_range:
        if s.connect_ex((host, port)) == 0:
                print("port", port, "is open!")
        else:
            print("port", port, "is closed!")
        
#scan(range(0,1000), "216.58.208.110")
