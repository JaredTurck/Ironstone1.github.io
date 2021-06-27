import math

def newton(n):
    a = 1
    d = a - n
    while math.fabs(d) > 0.0001:
        a = a -(d)/(2*a)
        d = a*a -n

    return a
