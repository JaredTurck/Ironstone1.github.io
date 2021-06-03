import time

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

npi = -3.141592653589793
dpi = 6.283185307179586
k = 1.27323954
l = 0.405284735

def timeit(func):
    start = time.time()
    for i in range(1_000_000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

def sin_2(x):
    if x < npi:
        x += dpi
    elif x > pi:
        x -= dpi

    # compute sin
    if x < 0:
        sin = k * x + l * x * x

        if sin < 0:
            sin = .225 * (sin *-sin - sin) + sin
        else:
            sin = .225 * (sin * sin - sin) + sin

    else:
        sin = k * x - l * x * x

        if sin < 0:
            sin = .225 * (sin *-sin - sin) + sin
        else:
            sin = .225 * (sin * sin - sin) + sin

    return sin
