import math, time, mpmath
import matplotlib.pyplot as plot

# ---- general methods ----
def draw_graph(func1, func2, start = 1, end = 1001, step=1000):
    y = [float(func1(i/step)) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [float(func2(i/step)) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def timeit(func):
    start = time.time()
    for i in range(1, 1_000_000):
        func(i/1_000_000)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

def time_all():
    timeit(asin)
    timeit(acos)
    timeit(atan)
    timeit(asec)
    timeit(acsc)
    timeit(acot)

def asin_1(x, itter=100):
    output = 0
    for i in range(2, itter, 2):
        odd = factor(1, 0, i+1)
        even = factor(1, 1, i+1)

        t1 = odd / even
        t2 = (x ** (i+1)) / (i+1)

        output += t1 * t2
        
    return x + output

# ---- inverse trig ----
pi = 3.141592653589793
def factor(start=1, offset=0, end=10):
    n = 1
    for x in range(start, end, 2):
        n *= (x + offset)
    return n

def generate_lookup_table(itter=100):
    table = {}
    for i in range(3, itter, 2):
        odd = factor(1, 0, i)
        even = factor(1, 1, i)
        table[i] = odd / even
    return table

itterations = 30
table = generate_lookup_table(itterations)
def asin(x):
    output = 0
    for i in range(3, itterations, 2):
        output += table[i] * ((x ** i) / i)
        
    return x + output

def acos(x):
    return (pi / 2) - asin(x)

def atan(x):
    t = 0
    for i in range(3, itterations, 2):
        if (i+1) % 4 == 0:
            t += (x ** i) / i
        else:
            t -= (x ** i) / i
            
    return x - t

def asec(x):
    return acos(1 / x)

def acsc(x):
    return asin(1 / x)

def acot(x):
    return atan(1 / x)

#draw_graph(asin, math.asin)
#timeit(asin2)
#timeit(acos)

# timeit results
#asin: 2.8350532054901123
#acos: 2.9615306854248047
#atan: 3.047534942626953
#asec: 2.9660232067108154
#acsc: 2.924138307571411
#acot: 3.140019416809082

#draw_graph(asin, math.asin)
#draw_graph(acos, math.acos)
#draw_graph(atan, math.atan)
#draw_graph(asec, mpmath.asec, start=1, end=100, step=1)
#draw_graph(acsc, mpmath.acsc, start=1, end=100, step=1)
#draw_graph(acot, mpmath.acot, start=1, end=100, step=1)
