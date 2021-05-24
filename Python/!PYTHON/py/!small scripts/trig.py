import math

def factorial(n):
    c = n
    for i in range(n-1, 0, -1):
        c *= i
    return c

def sin(x, i=100):
    c = 3
    n = 0
    for i in range(i):
        if i % 2 == 0:
            n += ((x**c) / factorial(c))
        else:
            n -= ((x**c) / factorial(c))
        c += 2
    return x - n

def cos(x, i=100):
    c = 2
    n = 0
    for i in range(i):
        if i % 2 == 0:
            n += ((x**c) / factorial(c))
        else:
            n -= ((x**c) / factorial(c))
        c += 2
    return 1 - n

def cos2(x, i=30):
    x %= 2 * math.pi
    c = 2
    n = 0
    f = 2
    for i in range(i):
        if i % 2 == 0:
            n += (x**c) / f
        else:
            n -= (x**c) / f
        c += 2
        f *= c * (c - 1)
    return 1 - n

def tan(x):
    return sin(x) / cos(x)

def test(itter=20,
         f1 = [sin, cos2, tan],
         f2 = [math.sin, math.cos, math.tan]):
    for f in range(len(f1)):
        print(f"\n --- {f1[f].__name__} ---")
        for i in range(1, itter):
            eql = round(f1[f](i), 8) == round(f2[f](i), 8)
            print(f"{i} {f1[f].__name__}: {round(f1[f](i), 8)}\t{round(f2[f](i), 8)}\t{eql}")

def test_cos2():
    correct = []
    for i in range(-1_000_000, 1_000_000):
        f1 = cos2(i)
        f2 = math.cos(i)
        if f1 == f2:
            correct.append(f1)
        if i % 100_000 == 0:
            print(f"Done {i} itterations!")
    return correct

def roundn(n, p=8):
    return int(n * (10**p)) / (10**p)

def round2(n, p=8):
    return round(float(str(n).split("e+")[0]), 8)

# faster method Chebyshev Polynomials
