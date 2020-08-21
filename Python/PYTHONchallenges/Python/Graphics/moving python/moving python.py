import time
counter = 0
while True:
    Title = open("Title.txt","r").readlines()
    for i in range(0,len(Title[0]),2):
        for ii in range(0,len(Title)):
            print(*Title[ii][i:i+80],sep="")
        try:
            counter = counter + 1
            File = open("animation/"+str(counter)+".txt","r").read()
            print(File)
        except:
            counter = 0
        print(open("Text.txt","r").read())
        time.sleep(0.4)
