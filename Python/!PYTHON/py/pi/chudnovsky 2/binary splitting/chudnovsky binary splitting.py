import math, time, isqrt

def pi_chudnovsky_bs(digits):
    C = 640320
    C3_OVER_24 = C**3 // 24
    def bs(a, b):
        if b - a == 1:
            if a == 0:
                Pab = Qab = (1)
            else:
                Pab = ((6*a-5)*(2*a-1)*(6*a-1))
                Qab = (a*a*a*C3_OVER_24)
            Tab = Pab * (13591409 + 545140134*a)
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
    
    DIGITS_PER_TERM = math.log10(C3_OVER_24/6/2/6)
    N = int(digits/DIGITS_PER_TERM + 1)

    print("[+] summing numbers!")
    start = time.time()
    P, Q, T = bs(0, N)
    print(f"[+] Took {round(time.time()-start,2)} seconds to sum numbers!")

    print("[+] squaring numbers!")
    start = time.time()
    one_squared = (10)**(2*digits)
    pi = (Q * 426880 * sqrt3(one_squared, digits)) // T
    print(f"[+] Took {round(time.time()-start,2)} seconds to square numbers!")
    
    return pi

def sqrt3(n, digits):
    # prepare x
    pt = 10 ** 16
    nf = float(((10005*n) * pt) // n) / pt
    x = (int(pt * math.sqrt(nf)) * n) // pt
    ni = n * n * 10005

    # preform the square root
    y = 0

    while y != x:
        y = x
        x = (x + ni // x) // 2

    return x

def main(digits):
    start = time.time()
    pi = pi_chudnovsky_bs(digits)
    with open("output.txt", "w") as file:
        file.write(str(pi))

    end = round(time.time() - start, 2)
    print(f"It took {end} seconds to compute {digits} digits!")

def test_counts():
    for i in range(1, 100):
        print(f"{round((i / 100)*100,2)}% complete")
        with open("data_counts.txt", "a") as file: file.write(f"{i},")
        main(i * 1000)
    
main(100_000)
