import socket, struct

# Setup socket object
s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_UDP)
s.bind((socket.gethostbyname(socket.gethostname()), 0))
s.setsockopt(socket.IPPROTO_IP, socket.IP_HDRINCL, 1)
s.ioctl(socket.SIO_RCVALL, socket.RCVALL_ON)

Id = 0
while (True):
    # Get data packet
    data = s.recvfrom(65565)
    packet = data[0]
    address = data[1]
    Id += 1
    
    header = struct.unpack('!BBHHHBBH4s4s', packet[:20]) # 14:34
    ip_src = '.'.join(map(str, header[8]))
    ip_dst = '.'.join(map(str, header[9]))

    #print("Number: ", Id, end="\t")             # Number
    #print("Address: ", address, end="")         # Address
    #print("Sender: ", ip_src, end="")           # Sender
    #print("reciver: ", ip_dst, end="")          # Reciver
    #print("Header: ", header)
    #print("Data: ", data)
    print(Id, "\t", address[0], "\t", ip_src, "\t", ip_dst)

    # Does the packet use UDP ports 27000 to 27015
    
#Header: (69, 0, 61, 1541, 0, 128, 17, 0, 192, 168, 56, 1, 255, 255, 255, 255)


'''
import socket
 
#create an INET, raw socket
s = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_UDP)
 
# receive a packet
while True:
  print(s.recvfrom(65565))
'''
