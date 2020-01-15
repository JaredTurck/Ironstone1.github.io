import time
while True:
    File = open("Text.txt","r").readlines()
    for i in range(len(File[0])):
        print("\n"*2)
        for ii in range(len(File)):
            print(*File[ii][i:i+80],sep="")
        time.sleep(0.05)
