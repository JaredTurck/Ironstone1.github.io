import math

pi = 3.141592653589793
pi2 = pi * 2
i = 10
end = 2 * i + 4

def sin(x):
    x = ((x + pi) % pi2 - pi)
    n = 0
    dn = x
    for c in range(1, end, 2):
        n = n + dn
        dn = dn * (-(x*x) / ((c + 1) * (c + 2)))
        if abs(dn) < 0.00000000001:
            return n
        
    return n

def cos(x):
    return sin(x + pi/2)

def tan(x):
    return sin(x) / cos(x)

print(f"{sin(5)}\t{math.sin(5)}")
print(f"{cos(5)}\t{math.cos(5)}")
print(f"{tan(5)}\t{math.tan(5)}")
