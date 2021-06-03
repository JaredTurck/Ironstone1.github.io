import time

pi = 3.141592653589793
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

def sin_1(x):
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

def sin_2(x):
    if x < -pi:
        x += pi * 2
    elif x > pi:
        x -= pi * 2

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
