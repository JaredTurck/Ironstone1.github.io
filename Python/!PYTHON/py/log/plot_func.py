import math, time
import matplotlib.pyplot as plot

# ---- graphs ----
def draw_graph(func, func2, start = -800, end = 800, div=100, colors=["red","blue"]):
    y = [func(i/div) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [func2(i/div) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor=colors[0], lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor=colors[1], lw=0.7)
    plot.show()

def draw_log(start= 1, end=500):
    x = [i/100 for i in range(start, end)]

    y = [log(i/100) for i in range(start, end)]
    y2 = [log2(i/100) for i in range(start, end)]
    y3 = [log10(i/100) for i in range(start, end)]
    y4 = [log1p(i/100) for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="blue", lw=0.7)
    plot.fill_between(x, y2, facecolor="none", edgecolor="green", lw=0.7)
    plot.fill_between(x, y3, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x, y4, facecolor="none", edgecolor="orange", lw=0.7)
    plot.show()

def draw_pi(itter=100):
    y = [int(i) for i in list(str(get_pi(itter)))]
    x = [i for i in range(0, len(y))]

    plot.fill_between(x, y, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def draw_func(func, itter=100):
    y = [int(str(i)) for i in func(itter)]
    x = [i for i in range(0, len(y))]

    plot.fill_between(x, y, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def draw_space_between_primes(itter=100):
    # get size of gaps
    primes = [i for i in prime(itter)]
    spaces = {}
    for i in range(len(primes)-1):
        space = primes[i+1] - primes[i]
        if space in spaces:
            spaces[space] += 1
        else:
            spaces[space] = 1

    # sort
    x = sorted(spaces.keys())
    y = []
    for key in x:
        y.append(spaces[key])
        print(f"{key}: {spaces[key]}")

    # show
    plot.fill_between(x, y, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()
    

def timeit(func):
    start = time.time()
    for i in range(1,1000000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

# ---- generate log e ----
e = 2.718281828459045
def ln(x, k=100):
    a = 0
    n = (x - 1) / (x + 1)
    for i in range(1, k, 2):
        a += (n ** i) / i
    return 2 * a

def log(x, b=e):
    return ln(x) / ln(b)

def log2(x):
    return log(x) / log(2)

def log10(x):
    return log(x) / log(10)

def log1p(x):
    return log(x + 1) / log(e)

# ---- sin, cos, tan ----
pi = 3.141592653589793
pi2 = pi*2
npi = -3.141592653589793
dpi = 6.283185307179586
k = 1.27323954
l = 0.405284735
def sin(x):
    x = ((x + pi) % pi2 - pi)
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

def cos(x):
    return sin(x + pi/2)

def tan(x):
    return sin(x) / cos(x)

# ---- pi ----
def pi_chudnovsky(one=1000000, do_check=True, itter=None):
    """
    Calculate pi using Chudnovsky's series

    This calculates it in fixed point, using the value for one passed in
    """
    
    k = 1
    a_k = one
    a_sum = one
    b_sum = 0
    C = 640320
    C3_OVER_24 = C**3 // 24
    while 1:
        a_k *= -(6*k-5)*(2*k-1)*(6*k-1)
        a_k //= k*k*k*C3_OVER_24
        a_sum += a_k
        b_sum += k * a_k
        k += 1
        if a_k == 0:
            break
        
    total = 13591409*a_sum + 545140134*b_sum
    pi = (426880*sqrt(10005*one, one)*one) // total
    return pi

def sqrt(n, one):
     """
     Return the square root of n as a fixed point number with the one
     passed in.  It uses a second order Newton-Raphson convergence.  This
     doubles the number of significant figures on each iteration.
     """
     # Use floating point arithmetic to make an initial guess
     fpp = 10**16
     n_float = float((n * fpp) // one) / fpp
     x = (int(fpp * math.sqrt(n_float)) * one) // fpp
     n_one = n * one
     while 1:
         x_old = x
         x = (x + n_one // x) // 2
         if x == x_old:
             break
     return x

def get_pi(ac=10):
    return pi_chudnovsky(1000000**int(ac/5.9), itter=ac)

# ---- prime ----
def prime(end=1_000):
    D = {}
    q = 2
    for i in range(2, end*2, 2):
        if q not in D:
            yield q
            D[q * q] = [q]
        else:
            for p in D[q]:
                D.setdefault(p + q, []).append(p)
            del D[q]
        q += 1

# ---- fibonacci ----
def fib(end=1_000):
    a = [0, 1]
    for i in range(end):
        a[1], a[0] = a[0] + a[1], a[1]
        yield a[0]
        

#draw_graph(log, math.log, start=1, end=9_000)
#draw_graph(sin, math.sin, start=-1000, end=1000)
#draw_graph(cos, math.cos, start=-1000, end=1000)
#draw_graph(tan, math.tan, start=-1000, end=1000)
#draw_graph(sin, cos, start=-1000, end=1000, colors=["blue","green"])

# math functions
#draw_graph(log2, math.log2, start=1, end=1000)
#draw_graph(log10, math.log10, start=1, end=1000)
#draw_graph(log1p, math.log1p, start=1, end=1000)
#draw_log()
#draw_pi(100)
#draw_func(prime, 1_000_000)
#draw_space_between_primes(1_000_000)
#draw_func(fib, 90)
