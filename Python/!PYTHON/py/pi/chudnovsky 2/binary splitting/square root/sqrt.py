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
