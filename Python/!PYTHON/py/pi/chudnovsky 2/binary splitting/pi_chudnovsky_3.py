import math, time

def pi(i):
    k = 1
    ak = i
    asum = i
    bsum = 0
    c = 640320
    co24 = c ** 3 // 24
    while ak != 0:
        ak = ak * -((6*k-5) * (2*k-1) * (6*k-1))
        ak = ak // (k*k*k*co24)
        asum += ak
        bsum += k * ak
        k += 1

    t = 13591409 * asum + 545140134 * bsum
    pi = (426880 * sqrt(10005*i, i)*i) // t
    return pi

def sqrt(n, i):
    fpp = 10 ** 16
    nf = float((n * fpp) // i) / fpp
    x = (int(fpp * math.sqrt(nf)) * i) // fpp
    ni = n * i
    xo = 0
    while x != xo:
        xo = x
        x = (x + ni // x) // 2

    return x

def calc_pi(i):
    start = time.time()
    result = pi(1_000_000**int(i/5.9))
    with open("pi_output.txt", "w") as file:
        file.write("3." + str(result)[1:i+1])

    end = round(time.time() - start, 2)
    print(f"It took {end} seconds to compute {i} digits!")

calc_pi(100_000)

# --- steps ---
# large summing
# large division
# invSqrt
# large multiply
