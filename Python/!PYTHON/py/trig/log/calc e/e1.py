import time, os, threading
from decimal import Decimal, getcontext
import decimal

class e():
    def __init__(self):
        self.total = Decimal(0)
        self.s = 100_000
        self.str_s = self.format_int(self.s)
        self.total_time = 0
        self.display_interval = 10
        self.cpu_count = os.cpu_count()
        self.n = 1
        self.x = 1

    def worker(self, t_count):
        print(f"Thread {t_count} started!")
        n = 1
        x = 1
        getcontext().prec = self.s

        for i in range(self.s, 1, ~self.cpu_count):
            self.x *= (i - t_count)
            self.n += self.x

    def divide(self):
        self.total = Decimal(self.n) / Decimal(self.x) + Decimal(1.0)

    def main(self):
        for i in range(self.cpu_count):
            t = threading.Thread(target=self.worker, args=[i])
            t.start()
        
    def calc_e(self):
        # calculate e in a single thread
        func_start = time.time()
        start = time.time()
        n = 1
        x = 1
        print("[+] Summing numbers...")
        getcontext().prec = self.s

        for i in range(self.s, 1, -1):
            x *= i
            n += x

            if i % 10_000 == 0:
                if time.time() - start > self.display_interval:
                    start = time.time()
                    pcnt = round(((self.s - i) / self.s) * 100, 2)
                    print(f"[+] {pcnt}% complete!")

        func_end = round(time.time() - func_start, 2)
        self.total_time += func_end
        print(f"[+] Finished {self.str_s} itterations in {func_end} seconds!")
        
        start = time.time()
        print("[+] Dividing numbers...")
        self.total = Decimal(n) / Decimal(x) + Decimal(1.0)
        
        end = round(time.time() - start, 2)
        self.total_time += end
        
        print(f"[+] Finished dividing in {end} seconds!")
        print(f"[+] Total time elapsed {round(self.total_time, 2)} seconds!")
        n = None
        x = None

    def write(self):
        fname = f"constant_e_{int(self.s/1000)}k.txt"
        with open(fname, "w") as file:
            file.write(str(self.total))

    def format_int(self, n):
        n = str(n)[::-1]
        output = []
        for i in range(0, len(n), 3):
            output = [n[i:i+3][::-1]] + output
        return ",".join(output)

a = e()
#a.calc_e()
#a.write()
#print("2.718281828459045235360287471352662497757247093699959574966967627")

# one million itterations
#[+] Finished 1,000,000 itterations in 862.27 seconds!
#[+] Dividing numbers...
#[+] Finished dividing in 1260.75 seconds!
#[+] Total time elapsed 2123.02 seconds!

# Xavier Gourdon algorithm
def xavier():
    N = 9009
    a = []
    x = 9009
    for n in range(9009, 0, -1):
        a.append(1)

    a[1] = 2
    while N > 9:
        N -= 1
        n = N
        while n:
            n -= 1
            a[n] = x % n
            x = 10 * a[n-1] + x/n
        print(x)
        
    
