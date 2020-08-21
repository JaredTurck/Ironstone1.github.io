import random
file = [i.split(",") for i in open("Insult.csv").readlines()]
class insult():
    
    def rand():
        r = random.sample(range(0,len(file)-1),3)
        print("Thou",file[r[0]][0],file[r[1]][1],file[r[2]][2],end="")

    def Insult(number):
        for i in range(1,number+1):
            r = random.sample(range(0,len(file)-1),3)
            print("%d) Thou"%(i),file[r[0]][0],file[r[1]][1],file[r[2]][2],end="")
