import math, time

def cos1(x, i=30):
    x %= 2 * math.pi
    c = 2
    n = 0
    f = 2
    for i in range(i):
        if i % 2 == 0:
            n += x**c / f
        else:
            n -= x**c / f
        c += 2
        f *= c * (c - 1)
    return 1 - n

def cos2(x, i=30):
    x %= 2 * math.pi
    n = 0
    dn = x**2 / 2
    for c in range(2, 2 * i + 2, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return 1 - n

def cos3(x, conv=2**-53):
    x %= 2 * math.pi
    c = 2
    n = 1.0
    dn = -x**2 / 2.0
    while abs(n / dn) > conv:
        n += dn
        c += 2
        dn *= -x**2 / (c * (c - 1))
    return n

def measure():
    for func in [math.cos, cos1, cos2, cos3]:
        count = 0
        start = time.time()
        for i in range(1, 1_000_000):
            func(i)
        end = time.time()

        per_second = int(60 / ((end - start) / 1_000_000))
        print(f"{func.__name__}: {end - start} secs ({per_second} per second!)")
