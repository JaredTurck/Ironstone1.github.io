import time
from decimal import Decimal, Context

itter = 100_000

# very slow
def calc_e():
    print("[+] calculating e...")
    start = time.time()
    result = str(Context(prec=itter).exp(1))
    fname = f"constant_e_{int(itter/1000)}k.txt"
    with open(fname, "w") as file:
        file.write(result)
        
    end = round(time.time() - start, 2)
    print(f"[+] Finished {itter} itterations in {end} seconds!")

calc_e()
