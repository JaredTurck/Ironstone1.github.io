import time
start = ["0.txt","1.txt","2.txt","3.txt","4.txt","5.txt","6.txt","7.txt","8.txt","9.txt","10.txt","11.txt","12.txt","13.txt","14.txt","17.txt","18.txt","19.txt","20.txt",]
while True:
    for i in range(0,19):
        print("\n"*30),print(open(start[i],"r").read())
        time.sleep(0.3)
