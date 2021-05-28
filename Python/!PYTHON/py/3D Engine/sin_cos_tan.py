pi = 3.141592653589793

def sin(x, i=30):
    x = (x + pi) % (2 * pi) - pi
    n = 0
    dn = x
    for c in range(1, 2 * i + 4, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

def cos(x, i=30):
    x = (x + pi) % (2 * pi) - pi
    n = 0
    dn = x**2 / 2
    for c in range(2, 2 * i + 2, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return 1 - n

def tan(x):
    return sin(x) / cos(x)
