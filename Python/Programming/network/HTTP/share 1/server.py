import socket

# Server
sock = socket.socket()
sock.bind((socket.gethostname(), 80))
sock.listen(1), print("looking for connections...")
while True:
    client, addr = sock.accept()
    print("recived connection from %s!" % addr[0])

    while True:
        # End message?
        while b"\r\n" not in message:
            message += client.recv(1)
        print(message[:-2])

        # End session?
        if message == b"break\r\n":
            client.send("Connection terminated!")
            client.quit()

# protocal
# End Message:  \r\n         - End of Message char
# End Session:  BREAK        - shutdown node connection
# echo message: ECHO         - sends client an echo of there request
