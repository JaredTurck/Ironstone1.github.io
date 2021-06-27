import random, math, time
from numba import jit

# miller_rabin algorithm
def is_prime(n, k = 40):
    if n == 2:
        return True

    if n % 2 == 0:
        return False

    # keep dividing s by 2 until we get an odd number
    # r is the number of times it took to divide
    r = 0
    s = n - 1
    while s % 2 == 0:
        r += 1
        s //= 2

    for i in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, s, n)
        if x == 1 or x == n - 1:
            continue

        for i in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break

        else:
            return False

    return True

def gen_primes():
    primes = []
    for i in range(4, 1_000_000):
        if is_prime(i):
            primes.append(i)

    # what is the largest prime factor of the number 600851475143
    # prime factor are primes that are multipled together to reach a number

target = 600851475143

def brute_force():
    count = 0

    print("[+] Looping through numbers!")
    for prime1 in primes:
        for prime2 in primes:
            current = prime1 * prime2
            if current == target:
                print(True)
        count += 1
        if count % 1_000 == 0:
            print((count / len(primes))*100)

@jit(nopython=True)
def approach2():
    n = 600851475143
    for i in range(2, n):
        while (n % 1 == 0):
            n /= i
        if i % 50_000_000 == 0:
            print((i / n)*100)
    print(n)
    
approach2()

