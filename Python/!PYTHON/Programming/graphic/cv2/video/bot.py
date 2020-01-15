import cv2, socket, pickle

serv = socket.socket()
serv.connect(("192.168.1.64", 80))
cam = cv2.VideoCapture(0)

while True:
    ret, frame = cam.read()

    if serv.recv(1024) == b"FRAME":
        serv.sendall(pickle.dumps(frame) + b"END")

    else:
        break


cam.release()
serv.shutdown(0)
