import math, time

def timeit(func):
    start = time.time()
    for i in range(1, 1000000):
        func(i / 1000000)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

test_dict = {0 : 0}
def dict_lookup_test(x):
    return test_dict[0]

def largest_tan():
    n = 0
    c = 0
    while True:
        c += 1
        t = math.tan(c / 1_000_000)
        if t > n:
            n = t
        else:
            break
    return [n, c]

def generate_lookup(digits = 1_000_000):
    table = {}
    n = 0
    c = 0
    while True:
        c += 1
        i = c / 1_000_000
        t = math.tan(i)
        if t > n:
            n = t
            table[i] = t
        else:
            break
    return table

table = generate_lookup()
def tan(x):
    return table[x]
