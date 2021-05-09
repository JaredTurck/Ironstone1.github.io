
def calc_e(x):
    n = 1
    for i in range(x):
        n = n + (n / x)
    return n

# subtract using only addition
def sub(a, b):
    n = 0
    i = 0
    while i < a:
        i += b
        n += 1

    return n

# compare strings
def greater_then(a, b):
    if len(a) > len(b):
        return True
    elif len(b) > len(a):
        return False

    #compare each digits of the string
    for i in range(len(a)):
         if (int(a[i]) > int(b[i])):
            print([i, int(a[i]), int(b[i])])
            return True
    return ""

def test_grt():
    for i in range(20, 50):
        print(f'{i} > 35 = {greater_then(str(i), "35")}')
