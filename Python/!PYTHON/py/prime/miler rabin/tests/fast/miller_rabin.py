import random, math, time
from numba import jit

def timeit(func):
    print(f"[+] Started {func.__name__}!")
    start = time.time()
    for i in range(4, 1_000_000):
        func(i)
    end = round(time.time() - start, 2)
    print(f"{func.__name__}: {end}")

# miller_rabin algorithm
# optimised with jit
@jit(nopython=True)
def is_prime(n, k = 40):
    if n == 2:
        return True

    if n % 2 == 0:
        return False

    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2

    for i in range(k):
        a = random.randrange(2, n - 1)
        x = (a ** s) % n
        if x == 1 or x == n - 1:
            continue

        for i in range(r - 1):
            x = (x ** 2) % n
            if x == n - 1:
                break

        else:
            return False

    return True

# not optimised
def is_prime2(n, k = 40):
    if n == 2:
        return True

    if n % 2 == 0:
        return False

    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2

    for i in range(k):
        a = random.randrange(2, n - 1)
        x = (a ** s) % n
        if x == 1 or x == n - 1:
            continue

        for i in range(r - 1):
            x = (x ** 2) % n
            if x == n - 1:
                break

        else:
            return False

    return True

is_prime(4)
is_prime2(4)

timeit(is_prime)
timeit(is_prime2)
