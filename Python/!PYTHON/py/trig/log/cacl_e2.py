import time, math, os, threading
from decimal import Decimal, getcontext

class e():
    def __init__(self):
        self.itter = 10_000
        self.total = Decimal(0)

    def calc_e(self):
        start = time.time()
        start2 = time.time()
        getcontext().prec = self.itter
        x = Decimal(1)
        t = Decimal(0)
        n = Decimal(1)
        for i in range(1, self.itter):
            t += x / n
            n  = n * i

            if time.time() - start2 > 2:
                start2 = time.time()
                print(f"[+] {round((i / self.itter)*100,2)}% complete")

        self.total = t
        end = round(time.time() - start, 2)
        print(f"[+] Calculated {self.itter} itterations, time taken {end} secs!")

    def write(self):
        fname = f"constant_e_{self.itter // 1000}k_itter.txt"
        with open(fname, "w") as file:
            file.write(str(self.total))
        

a = e()
a.calc_e()
a.write()
