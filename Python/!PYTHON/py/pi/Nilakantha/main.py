from decimal import Decimal, getcontext
import time

getcontext().prec = 50

def timeit(func, itter=1000):
    start = time.time()
    func(itter)
    end = time.time()
    return round(end - start, 5)

# Viete series
def viete(itter=25):
    p = Decimal(2 ** 0.5)
    a = Decimal(p / 2)

    for i in range(itter):
        p = (2 + p) ** Decimal(0.5)
        a = a * (p / 2)
        
    return 2 / a

# Wallis's Series
def wallis(itter=25):
    pi = Decimal(4)
    for i in range(3, itter, 2):
        i = Decimal(i)
        pi = pi * ((i - 1) / i) * ((i + 1) / i)
        
    return pi

# Leibniz's Series
def leibniz(itter=25):
    s = Decimal(1)
    pi = Decimal(0)
    for i in range(1, itter * 2, 2):
        i = Decimal(i)
        pi = pi + (s * (4 / i))
        s = -s

    return pi

# Nilakantha's Series
def Nilakantha(itter=25):
    s = Decimal(1)
    pi = Decimal(3)
    for i in range(2, itter * 2, 2):
        i = Decimal(i)
        pi = pi + s * (4 / (i * (i + 1) * (i + 2)))
        s = -s

    return pi

def time_all():
    print("\nTimeit:")
    print(f"Viete series:\t\t {timeit(viete, 20_000)} (20_000 itterations)")
    print(f"Wallis's Series:\t {timeit(wallis, 5_000_000)} (5_000_000 itterations)")
    print(f"Leibniz's Series:\t {timeit(leibniz, 5_000_000)} (5_000_000 itterations)")
    print(f"Nilakantha's Series:\t {timeit(Nilakantha, 5_000_000)} (5_000_000 itterations)")

def accuracy(func, itter, name):
    correct = "1415926535897932384626433832795028841971693993751"
    
    start = time.time()
    f = func(itter)
    end = round(time.time() - start, 2)
    
    result = str(f).replace("3.", "")
    result2 = str(f)
    accurate = 0
    
    for i in range(len(result)):
        if result[i] == correct[i]:
            accurate += 1
        else:
            break
    print(f"{result2} ({name}) ({accurate} accuracy) ({end} seconds)")
    
print("3.14159265358979323846264338327950288419716939937510 (correct value)")
accuracy(viete, 30_000, "Viete Series")
accuracy(wallis, 10_000_000, "Wallis's Series")
accuracy(leibniz, 10_000_000, "Leibniz's Series")
accuracy(Nilakantha, 6_000_000, "Nilakantha's Series")

#print(f"{viete(20_000)} (Viete Series)")
#print(f"{wallis(5_000_000)} (Wallis's Series)")
#print(f"{leibniz(5_000_000)} (Leibniz's Series)")
#print(f"{Nilakantha(5_000_000)} (Nilakantha's Series)")
#time_all()
