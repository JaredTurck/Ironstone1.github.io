import socket, threading, time

def scan(port_range, host, tnum):
    print("[+] Thread " + str(tnum) + " started!")
    s = socket.socket()
    #s.settimeout(2)
    last = time.time()
    for port in port_range:
        if port % tnum == 0:
            if s.connect_ex((host, port)) == 0:
                print("port", port, "is open!")
            if time.time()-last > 2:
                print("[thread "+str(tnum)+"] scanned " + str(port)+" ports!")
                last = time.time()
    print('[+] Thread Finished!')

host = "86.133.96.0"
port_range = range(1, 1000)
thread_count = 2
threads = []

for i in range(1, thread_count):
    current = threading.Thread(target=scan, args=[port_range, host, i])
    current.start()
    threads.append(current)
