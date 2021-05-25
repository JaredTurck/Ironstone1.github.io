
# calculate Euler's number
def calc_e(n):
    o = 0
    for i in range(1, n+1):
        c = 1
        for x in range(1, i+1):
            c *= x
        o += 1 / c
    return 1 + o
