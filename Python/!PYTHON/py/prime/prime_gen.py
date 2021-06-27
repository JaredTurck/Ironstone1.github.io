import time

def prime(n):
    D = {}
    q = 2

    for i in range(n):
        if q not in D:
            yield q
            D[q * q] = [q]

        else:
            for p in D[q]:
                D.setdefault(p + q, []).append(p)
            del D[q]

        q += 1

primes = [i for i in prime(10 ** 6)]
def is_prime(n):
    if n in primes:
        return True
    else:
        return False
