import time, os, threading
from decimal import Decimal, getcontext
import decimal

class e():
    def __init__(self):
        self.total = 0
        self.s = 10_000
        self.cpu_count = os.cpu_count()
        self.count = 0
    
    def calc_e(self):
        n = 1
        x = 1
        print("[+] Summing numbers...")
        getcontext().prec = self.s

        for i in range(self.s, 1, -1):
            x *= i
            n += x

        self.total = Decimal(n) / Decimal(x) + Decimal(1.0)

    def worker(self):
        while self.count < self.i-1:
            self.x2 += self.x
            self.count += 1

    def calc_e2(self):
        self.n = 1
        self.x = 1
        self.x2 = self.x
        print("[+] Summing numbers...")
        getcontext().prec = self.s

        for i in range(self.s, 1, -1):
            
            # calc x *= i
            #for l in range(i-1):
            #    x2 += x
            #
            
            self.i = i
            self.count = 0
            
            for t_count in range(self.cpu_count):
                t = threading.Thread(target=self.worker)
                t.start()
            
            self.x = self.x2

            # calc n += x
            self.n += self.x2

        self.total = Decimal(self.n) / Decimal(self.x) + Decimal(1.0)

    def write(self):
        fname = f"constant_e_{int(self.s/1000)}k.txt"
        with open(fname, "w") as file:
            file.write(str(self.total))

a = e()
#a.calc_e()
a.calc_e2()
a.write()

# x is factorial(itter)
# n is factorail(1) + factorial(2) + ... factorial(itter)
