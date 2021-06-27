import math, time, mpmath
import matplotlib.pyplot as plot

# ---- general functions ----
def draw_graph(func1, func2, start = 1, end = 1001):
    y = [func1(i) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [float(func2(i)) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def timeit(func):
    start = time.time()
    for i in range(1, 1000000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

def time_all():
    timeit(asinh)
    timeit(acosh)

def factor(start=2, end=30, step=2, offset=-1):
    t = 1
    for i in range(start, end, step):
        t *= i
    if offset == -1:
        return t
    else:
        return (t * (i + offset))

def gen_table(start=2, end=30, step=2, offset=1, i_offset=0):
    t = {}
    for i in range(start, end, step):
        t[i+i_offset] = factor(start, i+step, step, offset)
    return t

# ---- log ----
def ln(x, k=100):
    a = 0
    n = (x - 1) / (x + 1)
    for i in range(1, k, 2):
        a += (n ** i) / i
    return 2 * a

# ---- inverse hyperbolic ----
itterator = 100
asinh_num = gen_table(1, itterator+2, 2, -1, 1)
asinh_den = gen_table(2, itterator+2, 2, 0, 0)
def asinh(x):
    t = 0
    for i in range(2, itterator, 2):
        n = asinh_num[i] / (asinh_den[i] * (x**i))
        if n < 1e-12:
            return math.log(x * 2) + t
        elif i % 4 == 0:
            t -= n
        else:
            t += n
    return ln(x * 2) + t

def acosh(x):
    t = 0
    for i in range(2, itterator, 2):
        n = asinh_num[i] / (asinh_den[i] * (x**i))
        #if n < 1e-12:
        #    return ln(x * 2) + t
        #if i % 4 == 0:
        #    t += n
        #else:
        #    t += n
        t += n
        
    return ln(x * 2) - t

#draw_graph(asinh, mpmath.asinh, start=1, end=1000)
#draw_graph(acosh, mpmath.acosh, start=1, end=1000)
