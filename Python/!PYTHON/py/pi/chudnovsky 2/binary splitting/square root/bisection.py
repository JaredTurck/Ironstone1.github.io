
def sqrt(n):
    hi = n
    lo = 0
    mid = (hi + lo) // 2
    mid2 = mid * mid
    while lo < hi-1 and mid2 != n:
        if mid2 < n:
            lo = mid
        else:
            hi = mid
        mid = (hi + lo) // 2
        mid2 = mid*mid

    return mid

n = 10**10_000
sqrt(n)
