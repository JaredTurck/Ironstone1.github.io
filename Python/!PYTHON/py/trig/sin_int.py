import math, time
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
    timeit(cos)
    timeit(sin2)
    timeit(cos2)
    timeit(sin3)
    timeit(cos3)
    print("math:")
    timeit(math.sin)
    timeit(math.cos)

# low precision sin/cos 1-2 decimal places
# completely loses precision after numbers < -1000 or > 1000
pi = 3.141592653589793
npi = -3.141592653589793
dpi = 6.283185307179586
k = 1.27323954
l = 0.405284735

def sin(x):
    if x < npi:
        x += dpi
    elif x > pi:
        x -= dpi

    # compute sin
    if x < 0:
        sin = k * x + l * x * x
    else:
        sin = k * x - l * x * x

    return sin

def cos(x):
    if x < npi:
        x += dpi
    elif x > pi:
        x -= dpi

    # compute cos
    x += 1.57079632
    if x > pi:
        x -= dpi

    if x < 0:
        cos = k * x + l * x * x
    else:
        cos = k * x - l * x * x

    return cos

#draw_graph(cos, math.cos)
#time_sin()

# higher precision sin/cos 5-6 decimal places
def sin2(x):
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

def cos2(x):
    x += 1.57079632
    if x < npi:
        x += dpi
    elif x > pi:
        x -= dpi

    # compute cos
    if x < 0:
        cos = k * x + l * x * x

        if cos < 0:
            cos = .255 * (cos *-cos - cos) + cos
        else:
            cos = .255 * (cos * cos - cos) + cos

    else:
        cos = k * x - l * x * x

        if cos < 0:
            cos = .225 * (cos *-cos - cos) + cos
        else:
            cos = .225 * (cos * cos - cos) + cos

    return cos

pi = 3.141592653589793
pi2 = pi * 2

def sin3(x):
    return sin2((x + pi) % pi2 - pi)

def cos3(x):
    return cos2((x + pi) % pi2 - pi)

#draw_graph(sin, math.sin, start=-1100, end=1100)
#compare_accuracy(sin3, math.sin, r1=100_000, r2=10, prnt=False)
#draw_graph(cos2, math.cos)
#time_sin()
#compare_accuracy(sin2, math.sin)
