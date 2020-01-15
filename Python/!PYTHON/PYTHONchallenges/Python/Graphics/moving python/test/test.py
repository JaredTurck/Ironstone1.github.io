import time
Body = open("Body.txt","r").readlines()
count = 0
while True:
    count = count + 32
    print("\n"*50)
    print(*Body[count-32:count],sep="")
    time.sleep(0.2)
