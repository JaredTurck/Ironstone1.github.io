import random, math, time

# miller_rabin algorithm
def is_prime(n, k = 40):
    if n == 2:
        return True

    if n % 2 == 0:
        return False

    print("[+] Dividing number until we get even!")
    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2
        if r % 5_000 == 0:
            print(f"[+] r={r}")

    print("[+] main loop started!")
    for i in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, s, n)
        if x == 1 or x == n - 1:
            continue

        print("[+] Calculating power!")
        x = pow(x, 2) % n
        for ii in range(r - 1):
            if x == n - 1:
                break
            if ii % 1_000 == 0:
                print(f"[+] itteration {i+1} of {k}! {(ii/r)*100}% complete!")

        else:
            return False

        print(f"{round((i/k)*100, 2)}% Complete!")

    return True

# largest known prime 2 ** 82_589_933 -1
#n = (2 ** 82_589_933) -1
#n = (2 ** 50_000) + 1
#n = 982451653
print(is_prime(982451653))
