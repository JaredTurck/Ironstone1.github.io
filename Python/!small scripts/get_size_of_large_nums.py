import math, time

n = 2**1_000_000

def len_str(n):
    start = time.time()
    l = len(str(n))
    end = time.time()
    return [end-start, l]

def div_10(n):
    start = time.time()
    count = 0
    while n > 1:
        n //= 10
        count += 1
    end = time.time()
    return [end-start, count]

def log10(n):
    start = time.time()
    l = math.log10(n)+1
    end = time.time()
    return [end-start, int(l)]
