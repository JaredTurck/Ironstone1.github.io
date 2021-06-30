import math, time
from decimal import Decimal, getcontext

def pi_chudnovsky_bs(digits):
    getcontext().prec = digits
    C = 640320
    CO24 = C**3 // 24
    def bs(a, b):
        if b - a == 1:
            if a == 0:
                Pab = Qab = (1)
            else:
                Pab = ((6 * a - 5) * (2 * a - 1) * ( 6 * a - 1))
                Qab = ( a * a * a * CO24)
            Tab = Pab * (13591409 + 545140134 * a)
            if a & 1:
                Tab = -Tab
        else:
            m = (a + b) // 2
            Pam, Qam, Tam = bs(a, m)
            Pmb, Qmb, Tmb = bs(m, b)
            
            Pab = Pam * Pmb
            Qab = Qam * Qmb
            Tab = Qmb * Tam + Pam * Tmb

        return Pab, Qab, Tab

    print("[+] Summing numbers!")
    start = time.time()
    digits_per_term = math.log10(CO24/6/2/6) # / 72
    N = int(digits / digits_per_term + 1)
    P, Q, T = bs(0, N)
    print(f"[+] Took {round(time.time()-start,2)} seconds to sum numbers!")
    
    print("[+] squaring numbers!")
    start = time.time()
    one_squared = 10 ** (2 * digits)
    pi = (Q * 426880 * sqrt_2(one_squared, digits)) / Decimal(T)
    
    print(f"[+] Took {round(time.time()-start,2)} seconds to square numbers!")
    return pi

def sqrt_2(n, digits):
    # prepare x
    pt = 10 ** 16
    print("[+] Calculating floats!")
    nf = float(((10005*n) * pt) // n) / pt
    x = (int(pt * math.sqrt(nf)) * n) // pt
    ni = n * n * 10005

    # preform the square root
    print("[+] Preforming square root!")
    y = 0

    while y != x:
        y = x
        x = (x + ni // x) // 2

    return x

def main(digits):
    start = time.time()
    pi = pi_chudnovsky_bs(digits)
    print("[+] Writing digits to file!")
    with open("output_2.txt", "w") as file:
        file.write(str(pi))
    print(f"[+] Total time {time.time() - start}!")

main(100_000)
