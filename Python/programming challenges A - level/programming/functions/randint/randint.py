def randint(Start, End):
    n = int(open("n.txt").read())
    open("n.txt","w").write(str(n+1))

    k = int(str(n ** -.02).replace(".","")) + End

    return Start + (k % (End - Start+1))
