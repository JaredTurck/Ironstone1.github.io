import time

def itter_count(itter):
    start = time.time()
    for i in range(itter): pass
    end = time.time()
    return end-start

for i in range(1, 11):
    n = pow(10, i)
    r = itter_count(n)
    print(f"{n} itterations: {r}")

"""
itterations, number of seconds
1_000 = 0.0
10_000 = 0.0
100_000 = 0.0010001659393310547
1_000_000 = 0.011998891830444336 (million itter)
10_000_000 = 0.11400008201599121
100_000_000 = 1.1429896354675293
1_000_000_000 = 12.060617208480835 (billion itter)
10_000_000_000 = 
"""
