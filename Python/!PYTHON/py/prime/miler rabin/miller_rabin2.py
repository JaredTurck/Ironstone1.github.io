import random, math, time

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

def log_primes(n=1_000_000):
    primes = []
    for i in range(4, n):
        if is_prime(i):
            primes.append(i)
            
        if i % 100_000 == 0:
            print(f"{round(i / n, 2)}% complete")
            
    with open("output.txt", "w") as file:
        file.write(",".join([str(i) for i in primes]))

#log_primes(10_000_000)
#is_prime(31889)
