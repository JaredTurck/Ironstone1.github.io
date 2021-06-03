import math, time
import matplotlib.pyplot as plot

# general methods
def draw_graph(func1, func2, start = 1, end = 400):
    y = [func1(i/1000) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [func2(i/1000) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def timeit(func):
    start = time.time()
    for i in range(1_000_000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

# ---- asin ----
pi = 3.141592653589793
def factor(start=1, offset=0, end=10):
    n = 1
    for x in range(start, end, 2):
        n *= (x + offset)
    return n

def asin(x, itter=10):
    output = 0
    for i in range(2, itter, 2):
        odd = factor(1, 0, i+1)
        even = factor(1, 1, i+1)

        t1 = odd / even
        t2 = (x ** (i+1)) / (i+1)

        output += t1 * t2
        
    return x + output

def acos(x):
    return (pi / 2) - asin(x)

#draw_graph(asin, math.asin)
#timeit(asin)
