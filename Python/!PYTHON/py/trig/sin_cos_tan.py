import time, math
import matplotlib.pyplot as plot

# general methods
def timeit(func):
    start = time.time()
    for i in range(1_000_000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

def compare(func1, func2):
    for i in range(20):
        print(f"{func1.__name__}: {func1(i)}\t{func2.__name__}: {func2(i)}")

def compare_accuracy(func1, func2, r1=200, r2=10, prnt=True):
    lowest_accuracy = 999
    for i in range(r1):
        f1 = str(func1(i/r2))
        f2 = str(func2(i/r2))

        # count correct digits
        count = 0
        wrong = 0
        for d in range(len(f2)):
            try:
                if f1[d] == f2[d]:
                    count += 1
                else:
                    wrong += 1
            except:
                break

        # pad strings
        while len(f1) < 20:
            f1 += " "
        while len(f2) < 20:
            f2 += " "

        # lowest accuracy
        if i > 0:
            if count < lowest_accuracy:
                lowest_accuracy = count

        if prnt == True:
            print(f"{func1.__name__}: {f2}\t{func2.__name__}: {f1}\t{count}\t{wrong}")
        
    print(f"Lowest Accuracy: {lowest_accuracy}")

def draw_graph(func1, func2, start = -800, end = 800):
    y = [func1(i/100) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [func2(i/100) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def time_sin():
    timeit(sin)
    timeit(sin2)
    timeit(sin3)
    timeit(sin4)
    timeit(sin5)
    timeit(sin6)
    timeit(sin7)
    timeit(sin8)

# attempt 1
pi = 3.141592653589793

def sin(x, i=30):
    x = (x + pi) % (2 * pi) - pi
    n = 0
    dn = x
    for c in range(1, 2 * i + 4, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

def cos(x, i=30):
    x = (x + pi) % (2 * pi) - pi
    n = 0
    dn = x**2 / 2
    for c in range(2, 2 * i + 2, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return 1 - n

def tan(x):
    return sin(x) / cos(x)
        
# attempt 2
pi = 3.141592653589793
pi2 = pi * 2
i = 10
end = 2 * i + 4
bil = 100_000_000_000_000
small = 0.00000000001

def sin2(x):
    x = (x + pi) % (2 * pi) - pi
    n = 0
    dn = x
    for c in range(1, end, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

def sin3(x):
    x = (x + pi) % pi2 - pi
    n = 0
    dn = x
    for c in range(1, end, 2):
        n += dn
        dn *= -(x*x) / ((c + 1) * (c + 2))
    return n

def sin4(x):
    x = (x + pi) % pi2 - pi
    n = 0
    dn = x
    for c in range(1, end, 2):
        n += dn
        dn = (dn * (-(x*x) / ((c + 1) * (c + 2))))
        
    return n

def sin5(x):
    x = (x + pi) % pi2 - pi
    n = 0
    dn = x
    for c in range(1, end, 2):
        n = n + dn
        dn = (dn * (-(x*x) / ((c + 1) * (c + 2))))
        
    return n

def sin6(x):
    x = ((x + pi) % pi2 - pi)
    n = 0
    dn = x
    for c in range(1, end, 2):
        n = n + dn
        dn = dn * (-(x*x) / ((c + 1) * (c + 2)))
        if dn > 0:
            if dn < 0.00000000001:
                return n
            
    return n

def sin7(x):
    x = ((x + pi) % pi2 - pi)
    n = 0
    dn = x
    for c in range(1, end, 2):
        n = n + dn
        dn = dn * (-(x*x) / ((c + 1) * (c + 2)))
        if abs(dn) < 0.00000000001:
            return n
        
    return n

def sin8(x):
    x = ((x + pi) % pi2 - pi)
    n = 0
    dn = x
    for c in range(1, end, 2):
        n = n + dn
        dn = dn * (-(x*x) / ((c + 1) * (c + 2)))
        if abs(dn) < small:
            return n
        
    return n

#timeit(cos)
#timeit(tan)
#time_sin()

#compare(sin4, math.sin)
#draw_graph(sin4, math.sin)
#compare_accuracy(sin6, math.sin, 100)
#compare_accuracy(sin6, math.sin, 100_000, 10, False)
