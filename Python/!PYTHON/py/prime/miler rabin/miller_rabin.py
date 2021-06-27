import random, math, time

# miller_rabin algorithm
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

# read files
def read_file(n):
    file = open(f"prime_test/primes{n}.txt", "r").read()
    file = file.strip().replace("\n", "")
    file = list(filter(None, file.split(")")[1].split(" ")))
    return [int(i) for i in file]

# load all the primes between 1 and nillion
def load_all(n=51):
    print(f"[+] Loading {n} files!")
    primes = []
    for i in range(1, n):
        primes += read_file(i)
        print(f"[+] loaded {i} of {n} ({int((i / n)*100)}%)")
    return primes

# test accuracy
def test_accuracy(n=51):
    # load primes
    start = time.time()
    print(f"[+] Loading primes!")
    primes = load_all(n)[4:]

    # test accuracy
    print("[+] Testing accuracy!")
    wrong_nums = []
    right_count = 0
    len_primes = len(primes)
    
    for i,prime in enumerate(primes):
        if is_prime(prime) == True:
            right_count += 1
        else:
            wrong_nums.append(prime)

        if i % 50_000 == 0:
            print(f"[+] {round((i / len_primes)*100, 2)}% complete!")

    # write results to file
    print("[+] Writing results to file!")
    with open("output.txt", "w") as file:
        file.write(f"Wrong nums: {str(wrong_nums)}\nRight: {str(right_count)}")

    end = round(time.time() - start, 2)
    print(f"[+] Ttoal time taken {end} seconds!")

    return wrong_nums, right_count

#result = test_accuracy(50)
