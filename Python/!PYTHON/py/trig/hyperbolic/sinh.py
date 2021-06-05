import math, time, mpmath
import matplotlib.pyplot as plot

# ---- general functions ----
def draw_graph(func1, func2, start = 1, end = 1001):
    y = [func1(i/1000) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [float(func2(i/1000)) for i in range(start, end)]
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

def time_hyperbolic():
    timeit(sinh)
    timeit(cosh)
    timeit(tanh)
    timeit(sech)
    timeit(csch)
    timeit(coth)

def factorial(x):
    t = 1
    for i in range(x, 0, -1):
        t *= i
    return t

# ---- hyperbolic ----
def generate_table(offset=3, itter=100):
    output = {}
    for i in range(offset, itter, 2):
        output[i] = factorial(i)
    return output

itter = 30
table_sin = generate_table(3, 100)
def sinh(x):
    t = x
    for i in range(3, itter, 2):
        t += (x ** i) / table_sin[i]
    return t

table_cos = generate_table(2, 100)
def cosh(x):
    t = 1
    for i in range(2, itter, 2):
        t += (x ** i) / table_cos[i]
    return t

def tanh(x):
    return sinh(x) / cosh(x)

def sech(x):
    return cosh(x) ** -1

def csch(x):
    return sinh(x) ** -1

def coth(x):
    return tanh(x) ** -1

#draw_graph(sinh, math.sinh)
#draw_graph(cosh, math.cosh)
#draw_graph(tanh, math.tanh)
#draw_graph(sech, mpmath.sech)
#draw_graph(csch, mpmath.csch)
#draw_graph(coth, mpmath.coth)
#time_hyperbolic()
