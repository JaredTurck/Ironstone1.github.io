import math, time, mpmath
import matplotlib.pyplot as plot

# ---- general functions ----
def draw_graph(func1, func2, start = 1, end = 1001, step=1000):
    y = [func1(i/step) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [float(func2(i/step)) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def timeit(func):
    start = time.time()
    for i in range(1, 1000000):
        func(i/10)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

def time_all():
    timeit(exp)
    timeit(exp2)
    timeit(ax)
    timeit(esinx)
    timeit(ecosx)
    timeit(etanx)
    timeit(excosx)

def factorial(x):
    t = 1
    for i in range(x, 0, -1):
        t *= i
    return t

# ---- trig ----
pi = 3.141592653589793
pi2 = pi * 2
e = 2.718281828459045
i = 10
end_sin = 2 * i + 4
end_cos = 2 * i + 2

def sin(x):
    x = (x + pi) % pi2 - pi
    n = 0
    dn = x
    for c in range(1, end_sin, 2):
        n = n + dn
        dn = (dn * (-(x*x) / ((c + 1) * (c + 2))))
        
    return n

def cos(x, i=30):
    x = (x + pi) % (2 * pi) - pi
    n = 0
    dn = x**2 / 2
    for c in range(2, end_cos, 2):
        n = n + dn
        dn = dn * (-(x*x) / ((c + 1) * (c + 2)))
        
    return 1 - n

def tan(x):
    return sin(x) / cos(x)

# ---- log ----
def ln(x, k=100):
    a = 0
    n = (x - 1) / (x + 1)
    for i in range(1, k, 2):
        a += (n ** i) / i
    return 2 * a

# ---- exponential ----
itterations = 30
def generate_table(start=1, itter=30, step=1):
    t = {}
    for i in range(1, itter, step):
        t[i] = factorial(i)
    return t

exp_table = generate_table(1, itterations, 1)
def exp(x):
    #raises e^x
    t = 0
    for i in range(1, itterations):
        t += (x ** i) / exp_table[i]
    return 1 + t

# not sure if these functions are correct
def exp2(x):
    # raises e^-x2
    return exp(-x ** 2)

def ax(x):
    # raises e^x*ln(e)
    return exp(x * ln(e))

def esinx(x):
    # raises e^sin(x)
    return exp(sin(x))

def ecosx(x):
    # raises e^cos(x)
    return exp(cos(x))

def etanx(x):
    # raises e^tan(x)
    return exp(tan(x))

def exsinx(x):
    # raises e^x * sin(x)
    return exp(x) * sin(x)

def excosx(x):
    # raises e^x * cos(x)
    return exp(x) * cos(x)

#draw_graph(exp, math.exp, 0, 1000, 100)
#draw_graph(exp2, exp2, -1000, 1000, 100)
#draw_graph(ax, ax, -1000, 1000, 100)
#draw_graph(esinx, esinx, -1000, 1000, 100)
#draw_graph(ecosx, ecosx, -1000, 1000, 100)
#draw_graph(etanx, etanx, -1000, 1000, 100)
#draw_graph(exsinx, exsinx, -1000, 1000, 100)
#draw_graph(excosx, excosx, -1000, 1000, 100)

#exp: 6.172129154205322
#exp2: 7.007775545120239
#ax: 14.281137466430664
#esinx: 8.417541027069092
#ecosx: 8.351343870162964
#etanx: 10.181567192077637
#excosx: 8.028941631317139
