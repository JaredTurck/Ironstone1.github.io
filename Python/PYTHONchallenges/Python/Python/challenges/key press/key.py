import msvcrt, time
position = 0
input(open("info.txt","r").read())
while True:
    key = msvcrt.getch()
    if key == b"a":
        position = position - 1
    elif key == b"d":
        position = position + 1
    elif key == b"\x1b":
        exit()
    if position >= 15 or position <= -15:
        position = 0
    File = open("A.txt","r").readlines()
    if key == b"w":
        print(*File[(position*62):(position*62)+20],sep="",end="")
        print(*File[position*62:(position*62)+42],sep="")
        time.sleep(0.6)
    print(*File[position*62:(position*62)+62],sep="")
    time.sleep(0.2)
