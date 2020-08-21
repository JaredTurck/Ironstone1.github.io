import os

def ranint(n1, n2):
    if os.path.exists("n.txt") == False:
        open("n.txt", "w").write("0")
    else:
        f1 = int(open("n.txt", "r").read())
        open("n.txt", "w").write(str(f1 + 1))
        
    print(f1)
    
