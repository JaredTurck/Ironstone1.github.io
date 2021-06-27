from decimal import Decimal, getcontext
import decimal
from numba import jit

@jit(nopython=True)
def calc_e():
    s = 1_000_000
    n = 1
    x = 1
    for i in range(s, 1, -1):
        x = x * i
        n = n + x

    with open("x.txt", "w") as file:
        file.write(str(x))

    with open("n.txt", "w") as file:
        file.write(str(n))

'''
getcontext().prec = 1_000_000
n, x, s = calc_e()

n = Decimal(n)
x = Decimal(x)
result = (n / x) + Decimal(1.0)

fname = "constant_e_"+str(int(s/1000))+"k.txt"
with open(fname, "w") as file:
    file.write(str(result))
'''

calc_e()
