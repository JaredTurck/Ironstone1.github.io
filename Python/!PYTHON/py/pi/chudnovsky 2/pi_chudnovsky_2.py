import math, time

def pi(i):
    k = 1
    ak = i
    asum = i
    bsum = 0
    c = 640320
    co24 = c**3 // 24
    while ak != 0:
        ak *= -(6*k-5)*(2*k-1)*(6*k-1)
        ak //= k*k*k*co24
        asum += ak
        bsum += k * ak
        k += 1

        if k % 1000 == 0:
            print(f"K={k}!")

    t = 13591409 * asum + 545140134*bsum
    pi = (426880 * sqrt(10005*i, i)*i) // t
    return pi

def sqrt(n, i):
    fpp = 10**16
    nf = float((n * fpp) // i) / fpp
    x = (int(fpp * math.sqrt(nf)) * i) // fpp
    ni = n * i
    while True:
        xo = x
        x = (x + ni // x) // 2
        if x == xo:
            break
    return x

def calc_pi(itter):
    start = time.time()
    result = pi(1000000**int(itter/5.9))
    with open('pi_output.txt', 'w') as f:
        f.write("3." + str(result)[1:itter+1])
    print(f"[+] Total time {time.time() - start}!")
    
calc_pi(200_000)
