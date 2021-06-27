import time, math, os, threading
from decimal import Decimal, getcontext

# calculate e using Taylor series
# 1 + 1/!1 + 1/!2 + 1/!3 + ... ∞
def calc_e1(exp_itter2 = 1_000):
    # set precision
    func_start = time.time()
    getcontext().prec = exp_itter2
    print("Calculation beginning...")

    # calc e
    x = Decimal(1)
    t = Decimal(0)
    n = Decimal(1)
    start = time.time()
    for i in range(1, exp_itter2):
        t += x / n
        n  = n * i
        
        if time.time() - start > 2:
            start = time.time()
            print(f"[+] {round((i / exp_itter2)*100,2)}% complete")

    func_end = round(time.time() - func_start, 4)
    print(f"[+] Calculated {exp_itter2} itterations, time taken {func_end} seconds!")

    # write to file
    fname = f"constant_e_{exp_itter2 // 1000}k_itter.txt"
    with open(fname, "w") as file:
        file.write(str(t))


# calc e with multithreading
class calc_e():
    def __init__(self):
        self.total = Decimal(0)
        self.itterations = 1_000
        self.cpu_count = os.cpu_count()
        self.totals = []
    
    def worker(self, thread_num):
        print(f"Thread {thread_num} started!")
        getcontext().prec = self.itterations
        x = Decimal(1)
        t = Decimal(0)
        n = Decimal(1)
        for i in range(1, self.itterations, self.cpu_count):
            t += x / n
            n  = n * (i + thread_num)

        #self.total += t
        self.totals.append(t)
        print(f"Thread {thread_num} finished!")

    def main(self):
        # CPU threads
        self.threads = []
        for t_count in range(self.cpu_count):
            thread = threading.Thread(target = self.worker, args=[t_count])
            self.threads.append(thread)
            thread.start()

    def write(self):
        fname = f"constant_e_{self.itterations // 1000}k_itter.txt"
        with open(fname, "w") as file:
            file.write(str(self.total))

#a = calc_e()
#a.main()
#a.write()

# test with multiple functions
class calc_e3():
    def __init__(self):
        self.total = Decimal(0)
        self.itterations = 100

    def worker1(self):
        x = Decimal(1)
        t = Decimal(0)
        n = Decimal(1)
        for i in range(1, self.itterations, 2):
            t += x / n
            n  = n * (i + 0)
            print("Worker 1", i)
            
        self.total += t

    def worker2(self):
        x = Decimal(1)
        t = Decimal(0)
        n = Decimal(1)
        for i in range(1, self.itterations, 2):
            t += x / n
            n  = n * (i + 1)
            print("Worker 2", i + 1)
            
        self.total += t

    def main(self):
        self.worker1()
        self.worker2()

b = calc_e3()
b.main()
