from decimal import Decimal, getcontext

def Nilakantha(itter=1_000_000):
    s = Decimal(1)
    pi = Decimal(3)
    for i in range(2, itter * 2, 2):
        i = Decimal(i)
        pi = pi + s * (4 / (i * (i + 1) * (i + 2)))
        s = -s

    return pi



def Nilakantha2(itter = 1_000_000):
    s = Decimal(1)
    pi = Decimal(3)
    for i in range(2, itter * 2, 2):
        i = Decimal(i)
        
        pi = pi + s * (4 / (i * (i + 1) * (i + 2)))
        
        s = -s
        print(s)

    return pi

def get_diffrence():
    a = (2 * (2 + 1) * (2 + 2))
    d = []
    for i in range(4, 100, 2):
        b = a
        a = (i * (i + 1) * (i + 2))
        d.append(a)
    return d
