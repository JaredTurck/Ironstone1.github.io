import math, time, mpmath
import matplotlib.pyplot as plot

# ---- general functions ----
def draw_graph(func1, func2, start = 1, end = 1001, step=100):
    y = [func1(i/step) for i in range(start, end)]
    x = [i/step for i in range(start, end)]

    y2 = [float(func2(i/step)) for i in range(start, end)]
    x2 = [i/step for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def timeit(func):
    start = time.time()
    for i in range(1, 1000000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end} μs")

def time_all():
    timeit(sin)
    timeit(sin2)
    timeit(cos2)

def generate_table_c(start=1, itter=10, step=2):
    t = {}
    for c in range(start, itter, step):
        t[c] = (c + 1) * (c + 2)
    return t

pi = 3.141592653589793
pi2 = pi * 2
itterations = 100
end_sin = 2 * itterations + 4
end_cos = 2 * itterations + 2
sin_table_c = generate_table_c(1, end_cos+2, 2)
cos_table_c = generate_table_c(2, end_cos+2, 2)
sin_range = [i for i in range(1, end_sin, 2)]
cos_range = [i for i in range(2, end_cos, 2)]

# ---- trig ----
def sin(x):
    x = (x + pi) % pi2 - pi
    n = 0
    dn = x
    for c in range(1, end_sin, 2):
        t = n + dn
        if n == t:
            n = t
            break
        
        n = t
        dn = (dn * (-(x*x) / sin_table_c[c]))
        
    return n


def sin2(x):
    x = (x + 3.141592653589793) % 6.283185307179586 - 3.141592653589793
    n = 0
    dn = x
    for c in sin_range:
        n = n + dn
        dn = (dn * (-(x*x) / sin_table_c[c]))
        if dn < 1e-8 and dn > 0:
            return n
        

def cos2(x):
    x = (x + 3.141592653589793) % 6.283185307179586 - 3.141592653589793
    n = 0
    dn = (x*x) / 2
    for c in cos_range:
        n = n + dn
        dn = (dn * (-(x*x) / cos_table_c[c]))
        if dn < 1e-8 and dn > 0:
            return 1 - n
