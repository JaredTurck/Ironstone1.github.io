import math, time
import matplotlib.pyplot as plot
from decimal import Decimal, getcontext

# ---- general functions ----
def draw_graph(func1, func2, start = 1, end = 1001, step=1000):
    y = [func1(i/step) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [float(func2(i/step)) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def timeit(func, div=1_000):
    start = time.time()
    for i in range(1, 1_000_000):
        func(i/div)
    end = time.time() - start
    print(f"{func.__name__}: {end} μs (microseconds)")

# ---- log ----
itter = 100

def ln(x):
    a = 0
    for i in range(2, itter):
        if i % 2 == 0:
            a += ((x - 1) ** i) / i
        else:
            a -= ((x - 1) ** i) / i
        
    return (x - 1) - a

def ln2(x):
    a = 1
    for i in range(1, itter, 2):
        a *= (((x-1) / (x+1)) ** i) + (1 / (i+2))
    return 2 * a

def log(x):
    a = 0
    n = (x - 1) / (x + 1)
    for i in range(1, itter, 2):
        a = a + ((n ** i) / i)
    return 2 * a

# calculate e using compound intrest
def calc_e(x):
    n = 1
    for i in range(int(x)):
        n += n / x
    return n

# calculate e using Taylor series
def factorial(x):
    t = 1
    for i in range(x, 0, -1):
        t *= i
    return t

exp_itter = 30
factors = [factorial(i) for i in range(exp_itter)]
def exp(x):
    t = 0
    for i in range(exp_itter):
        t += (x ** i) / factors[i]
    return t

# calculate e using Taylor series
# 1 + 1/!1 + 1/!2 + 1/!3 + ... ∞
def calc_e2(exp_itter2 = 1_000):
    # set precision
    func_start = time.time()
    getcontext().prec = exp_itter2
    print("Calculation beginning...")

    # calc e
    x = Decimal(1)
    t = Decimal(0)
    start = time.time()
    for i in range(exp_itter2):
        t += x / math.factorial(i)
        
        if time.time() - start > 2:
            start = time.time()
            print(f"[+] {round((i / exp_itter2)*100,2)}% complete")

    func_end = round(time.time() - func_start, 4)
    print(f"[+] Calculated {exp_itter2} itterations, time taken {func_end} seconds!")

    # write to file
    fname = f"constant_e_{exp_itter2 // 1000}k_itter.txt"
    with open(fname, "w") as file:
        file.write(str(t))

# calculate e using limmit
def calc_e3(n):
    return (1 + (1 / n)) ** n

# calc e
# this apprach doesn't work
def calce_4(itter_4 = 100):
    start = time.time()
    getcontext().prec = itter_4
    numerator = Decimal(0)
    denominator = Decimal(0)
    
    for i in range(1, itter_4):
        numerator += Decimal(1 ** i)
        denominator += Decimal(factorial(i))

    end = round(time.time() - start, 4)
    return Decimal(numerator / denominator)
    
