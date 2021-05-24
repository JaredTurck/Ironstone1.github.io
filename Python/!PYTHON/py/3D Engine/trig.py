import math, time

def factorial(n):
    c = n
    for i in range(n-1, 0, -1):
        c *= i
    return c

def sin2(x, i=100):
    c = 3
    n = 0
    for i in range(i):
        if i % 2 == 0:
            n += ((x**c) / factorial(c))
        else:
            n -= ((x**c) / factorial(c))
        c += 2
    return x - n

def cos2(x, i=100):
    c = 2
    n = 0
    for i in range(i):
        if i % 2 == 0:
            n += ((x**c) / factorial(c))
        else:
            n -= ((x**c) / factorial(c))
        c += 2
    return x - n

def sin(x, i=30):
    x %= 2 * math.pi
    c = 3
    n = 0
    f = 6
    for i in range(i):
        if i % 2 == 0:
            n += (x**c) / f
        else:
            n -= (x**c) / f
        c += 2
        f *= c * (c - 1)
    return x - n

def cos(x, i=30):
    x %= 2 * math.pi
    c = 2
    n = 0
    f = 2
    for i in range(i):
        if i % 2 == 0:
            n += (x**c) / f
        else:
            n -= (x**c) / f
        c += 2
        f *= c * (c - 1)
    return 1 - n

def tan(x):
    return sin(x) / cos(x)

def test(f, f2, i=100, prec=8):
    for i in range(-i, i+1):
        check = round(f(i), prec) == round(f2(i), prec)
        print(f"{i}\t{f(i)}\t{f2(i)}\t{check}")

def test_speed():
    a = ["", "", "", "math.", "math.", "math."]
    for i,func in enumerate([sin, cos, tan, math.sin, math.cos, math.tan]):
        end = time.time()+1
        current = time.time()
        count = 0
        
        while end > current:
            func(0)
            count += 1
            if count % 100 == 0:
                current = time.time()

        print(f"{a[i]}{func.__name__}: {count}")
