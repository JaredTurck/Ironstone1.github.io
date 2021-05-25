import itertools

def primes():
    d = {}
    q = 2
    while True:
        if q not in d:
            yield q
            d[q * q] = [q]
        else:
            for p in d[q]:
                d.setdefault(p + q, []).append(p)
            del d[q]
        q += 1

def get_primes(num):
    gaps = {}
    prime_nums = list(itertools.islice(primes(), num))
    for i in range(len(prime_nums)-1):
        gap = prime_nums[i+1]-prime_nums[i]
        if gap not in gaps:
            gaps[gap] = 1
        else:
            gaps[gap] += 1

    return gaps

def print_keys(num_dict):
    for i in num_dict.keys():
        print(i, num_dict[i])
