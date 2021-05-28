import math, time
import matplotlib.pyplot as plot

def factorial(n):
    c = n
    for i in range(n-1, 0, -1):
        c *= i
    return c

def sin(x, i=100):
    c = 3
    n = 0
    for i in range(i):
        if i % 2 == 0:
            n += ((x**c) / factorial(c))
        else:
            n -= ((x**c) / factorial(c))
        c += 2
    return x - n

def cos(x, i=100):
    c = 2
    n = 0
    for i in range(i):
        if i % 2 == 0:
            n += ((x**c) / factorial(c))
        else:
            n -= ((x**c) / factorial(c))
        c += 2
    return x - n

def cos2(x, i=30):
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

def sin2(x, i=30):
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

def cos3(x, i=30):
    x %= 2 * math.pi
    n = 0
    dn = x**2 / 2
    for c in range(2, 2 * i + 2, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return 1 - n

def sin3(x, i=30):
    x %= 2 * math.pi
    n = 0
    dn = x
    for c in range(1, 2 * i + 4, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

def cos4(x, i=30):
    x = (x + math.pi) % (2 * math.pi) - math.pi
    n = 0
    dn = x**2 / 2
    for c in range(2, 2 * i + 2, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return 1 - n

def sin4(x, i=30):
    x = (x + math.pi) % (2 * math.pi) - math.pi
    n = 0
    dn = x
    for c in range(1, 2 * i + 4, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

def draw_graph(start = -800, end = 800):
    y = [sin3(i/100) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [math.sin(i/100) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def psin():
    print("--- sin ---")
    for i in range(20):
        print(sin3(i))

    print("\n--- math.sin ---")
    for i in range(20):
        print(math.sin(i))

def tan(x):
    return sin(x) / cos(x)

def tan2(x):
    return sin2(x) / cos2(x)

def tan3(x):
    return sin3(x) / cos3(x)

def tan4(x):
    return sin4(x) / cos4(x)

def test(f, f2, i=100, prec=8):
    for i in range(-i, i+1):
        check = round(f(i), prec) == round(f2(i), prec)
        print(f"{i}\t{f(i)}\t{f2(i)}\t{check}")

def test_speed():
    a = ["math.", "math.", "math.", "1 ", "1 ", "1 ",
         "2 ", "2 ", "2 ", "3 ", "3 ", "3 ", "4 ", "4 ", "4 "]
    for i,func in enumerate([math.sin, math.cos, math.tan,
                             sin, cos, tan,
                             sin2, cos2, tan2,
                             sin3, cos3, tan3,
                             sin4, cos4, tan4]):
        try:
            start = time.time()
            for x in range(1000000):
                func(x)
            elapsed = (time.time() - start)
        except:
            elapsed = "Failed!"

        print(f"{a[i]}{func.__name__}: {elapsed} seconds")
