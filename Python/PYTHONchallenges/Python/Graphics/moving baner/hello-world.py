import time
start = open("File.txt","r").readlines()
for i in range(0,len(start)):
    start[i] = list(start[i])
while True:
    for x in range(0,len(start[0])):
        print("\n"*40)
        Print = []
        for i in range(0,len(start)):
            print(*start[i][x:x+80],sep="")
        time.sleep(0.05)
