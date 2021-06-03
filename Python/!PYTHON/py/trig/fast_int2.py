import math, time
import matplotlib.pyplot as plot

def timeit(func):
    start = time.time()
    for i in range(1_000_000):
        func(i)
    end = time.time() - start
    print(f"{func.__name__}: {end}")

def draw_graph(func1, func2, start = -800, end = 800):
    y = [func1(i/100) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [func2(i/100) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def compare2(func1, func2):
    for i in range(10):
        print(f"{func1.__name__}:   {func1(i)}\t{func2(i)}")

def compare_accuracy(func1, func2, r1=200, r2=10, prnt=True):
    lowest_accuracy = [999, 0]
    for i in range(r1):
        f1 = str(func1(i/r2))
        f2 = str(func2(i/r2))

        # count correct digits
        f1_s = f1.split(".")[1]
        f2_s = f2.split(".")[1]
        count = 0
        wrong = 0
        for d in range(len(f2_s)):
            try:
                if f1_s[d] == f2_s[d]:
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
            if count < lowest_accuracy[0]:
                lowest_accuracy = [count, f1, i/r2]

        if prnt == True:
            print(f"{func1.__name__}: {f2}\t{func2.__name__}: {f1}\t{count}\t{wrong}")
        
    print(f"Lowest Accuracy: {lowest_accuracy[0]}\t{lowest_accuracy[1]}\t{lowest_accuracy[2]}")

pi = 3.141592653589793
pi2 = 6.283185307179586
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

def sin2(x):
    x = ((x + pi) % pi2 - pi)
    
    if x < npi:
        x += dpi
    elif x > pi:
        x -= dpi

    # compute sin
    if x < 0:
        sin = k * x + l * x * x
        sin = .225 * (sin *-sin - sin) + sin

    else:
        sin = k * x - l * x * x
        sin = .225 * (sin *sin - sin) + sin

    return sin

def sin3(x):
    # sin3 inaccurate and slower
    # but is fewer lines of code
    x = ((x + pi) % pi2 - pi)
    
    x = x + (x < npi) * (dpi) + ((x > pi) * (-dpi))

    # compute sin
    sin = k * x + -(((x < 0) * -(l * 2)) + l) * x * x
    return .225 * (sin * ((x < 0) * (-sin * 4) + (sin * 2) - 1) - sin) + sin

def sin4(x):
    #(k * x + -(((x < 0) * -(l * 2)) + l) * x * x)

    #x = ((x + pi) % pi2 - pi)
    
    #x = (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
    
    return .225 * ((k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                    + -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                          < 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                    * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                    ) * (((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                          < 0) * (-(k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                    + -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                < 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                    * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                    ) * 4) + ((k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                               + -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                     < 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                               * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                               ) * 2) - 1) - (k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                              + -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                                    < 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                              * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                              )) + (k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                                    + -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                                          < 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                                    * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))
                                                                    )
sin5 = lambda x : .225 * ((k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))+ -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))< 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))* (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))) * (((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))< 0) * (-(k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))+ -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))< 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))* (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))) * 4) + ((k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi))) + -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi))) < 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi))) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi))) ) * 2) - 1) - (k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))+ -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))< 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))* (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi))))) + (k * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))+ -((((((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))< 0) * -(l * 2)) + l) * (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi)))* (((x + pi) % pi2 - pi) + (((x + pi) % pi2 - pi) < npi) * (dpi) + ((((x + pi) % pi2 - pi) > pi) * (-dpi))))

def time_sin():
    timeit(sin)
    timeit(sin2)
    timeit(sin3)
    timeit(sin4)
    timeit(sin5)
    
#draw_graph(sin3, math.sin)
#compare_accuracy(sin3, math.sin)
