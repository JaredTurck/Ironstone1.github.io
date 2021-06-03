import math, time

def timeit(func):
    start = time.time()
    for i in range(1_000_000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

pi = 3.141592653589793
pi2 = pi * 2
i = 10
end = 2 * i + 4
i = 10
end = 2 * i + 4

def sin(x, i=30):
    x = (x + pi) % (2 * pi) - pi
    n = 0
    dn = x
    for c in range(1, 2 * i + 4, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

def sin2(x):
    x = (x + pi) % pi2 - pi
    n = 0
    dn = x
    for c in range(1, end, 2):
        n = n + dn
        dn = (dn * (-(x*x) / ((c + 1) * (c + 2))))
        
    return n

pi = 3.141592653589793
npi = -3.141592653589793
dpi = 6.283185307179586
k = 1.27323954
l = 0.405284735

def sin3(x):
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

timeit(sin)
timeit(sin2)
timeit(sin3)
