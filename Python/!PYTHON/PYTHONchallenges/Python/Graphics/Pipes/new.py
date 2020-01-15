while True:
    def Pipes():
        try:
            RandNumber = list(open("Text.txt","r").read())
            if "~" in RandNumber:
                RandNumber.insert(0, RandNumber[len(RandNumber)-1])
                del RandNumber[len(RandNumber)-1]
            else:
                RandNumber.append(RandNumber[0])
                del RandNumber[0]
            File = open("Text.txt","w")
            for i in range(0,len(RandNumber)):
                File.write(RandNumber[i])
            return RandNumber
        except:
            pass
    RandNumber = Pipes()
    try:
        print(*RandNumber,sep="")
    except:
        Pipes()
