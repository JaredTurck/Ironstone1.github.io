
target = 2520

def test():
    n = 10
    c = 0
    for i in range(1, n+1):
        if (target / i) % 1 == 0:
            c += 1
            
    if c == n:
        print(True)

def calc():
    for i in range(1,10_000_000):
        c = 0
        for n in range(1, 21):
            if (i / n) % 1 == 0:
                c += 1
        if c >= 20:
            return i
