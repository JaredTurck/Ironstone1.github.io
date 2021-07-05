import math, time
from decimal import Decimal

def timeit(func):
    start = time.time()
    for i in range(1, 1000000):
        func(i/100_000)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

# --- Hyperbolic ---
'''
These functions are not as accurate as the Taylor series implimentation but they
are a lot faster to compute, being only a single line of code with no iteration.
Big thanks to William Jenkins for provding
me with the hyperbolic formulas.
'''

e = math.e

def sinh(x):
    return ((e ** x) - (e ** (-1 * x))) / 2

def cosh(x):
    return ((e ** x) + (e ** (-1 * x))) / 2

def tanh(x):
    return ((e ** (2 * x)) - 1) / ((e ** (2 * x)) + 1)

def sech(x):
    return 2 / ((e ** x) + (2 ** (-1 * x)))

def csch(x):
    return 2 / ((e ** x) - (e ** (-1 * x)))

def coth(x):
    return ((e ** (2 * x)) + 1) / ((e ** (2 * x)) - 1)

# timeit:
#sinh: 3.053511142730713 seconds (Taylor series)
#sinh: 0.34101223945617676 seconds (new formulas)
#about 8 times faster
