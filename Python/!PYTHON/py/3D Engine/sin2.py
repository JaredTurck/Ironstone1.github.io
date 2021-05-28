import math, time
import matplotlib.pyplot as plot

def draw_graph(start = -800, end = 800):
    y = [sin3(i/100) for i in range(start, end)]
    x = [i/100 for i in range(start, end)]

    y2 = [math.sin(i/100) for i in range(start, end)]
    x2 = [i/100 for i in range(start, end)]

    plot.fill_between(x, y, facecolor="none", edgecolor="red", lw=0.7)
    plot.fill_between(x2, y2, facecolor="none", edgecolor="blue", lw=0.7)
    plot.show()

def sin3(x, i=30):
    x %= 2 * math.pi
    n = 0
    dn = x
    for c in range(1, 2 * i + 4, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

def sin4(x, i=30):
    #x %= 2 * math.pi
    x = (x + math.pi) % (2 * math.pi) - math.pi
    n = 0
    dn = x
    for c in range(1, 2 * i + 4, 2):
        n += dn
        dn *= -x**2 / ((c + 1) * (c + 2))
    return n

#draw_graph()


