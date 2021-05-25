from decimal import Decimal, getcontext

itterations = 100000
getcontext().prec = itterations

def write_file(pi):
    with open("answer.txt", "w") as file:
        file.write(str(pi))

def pi():
    print("Calculating pi!")
    pi, n, d = 0, 4, 1
    for i in range(1, itterations):
        a = 2 * (i % 2) -1
        pi += a * Decimal(n) / Decimal(d)
        d += 2
    write_file(pi)

pi()
