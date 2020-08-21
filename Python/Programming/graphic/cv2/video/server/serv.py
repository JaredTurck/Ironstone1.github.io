import socket, numpy, cv2, pickle

s = socket.socket()
s.bind((socket.gethostname(), 80))
s.listen(1)
bot, addr = s.accept()

def recv_frame(buffer):
    data = bytearray(buffer)
    bot.send(b"FRAME")

    while b"END" not in data:
        data += bot.recv(1024)
    
    file, buffer = bytes(data).split(b"END")

    return (pickle.loads(file), buffer)

OverFlow = b""
while True:
    frame, OverFlow = recv_frame(OverFlow)

    cv2.imshow("frame",frame)

    if cv2.waitKey(1) & 0xFF == 27: # ESC
        bot.send(b"EXIT")
        break

bot.close()
cv2.destroyAllWindows()
