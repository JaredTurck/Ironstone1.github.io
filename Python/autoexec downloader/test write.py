try:
    with open("abc.txt", "r").read() as b:
        b.close()
except:
    with open("abc.txt", "w") as b: pass
