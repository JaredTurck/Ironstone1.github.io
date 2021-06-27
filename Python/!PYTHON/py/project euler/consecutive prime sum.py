import random

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


primes = [2, 3]
for i in range(4, 100_000):
    if is_prime(i):
        primes.append(i)

total = 0
i = 0
while total < 1_000_000:
    total += primes[i]
    i += 1

answer = sum([primes[x] for x in range(i-1)])
print(answer)
