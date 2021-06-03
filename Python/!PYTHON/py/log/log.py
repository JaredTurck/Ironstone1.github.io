import math, time

def timeit(func):
    start = time.time()
    for i in range(1,1000000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

def ln1(x):
    n = 10**12
    return n * ((x ** (1/n)) - 1)

# calc natural log Taylor series
def ln2(x, i=50):
    a = 0
    for i in range(2, i):
        if i % 2 == 0:
            a += (x - 1)**i
        else:
            a -= (x - 1)**i
    return (x - 1) - a

def ln3(x):
    return 2 * sum([((x-1) / (x+1))**i/i for i in range(1,100,2)])

# get natural log of a number
def log1(x, i=100):
    a = 0
    for i in range(1, i, 2):
        a += ((x-1) / (x+1))**i/i
    return 2 * a

# loses accuracy with large numbers
# increase k to increase accuracy
def log2(x, k=100):
    a = 0
    n = (x - 1) / (x + 1)
    for i in range(1, k, 2):
        a += (n ** i) / i
    return 2 * a

#timeit(log1)
