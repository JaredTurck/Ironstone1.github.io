def base(char, n):
    n = [n,""]
    while n[0] != 0:
        n[1] = (char[n[0] % len(char)] + n[1])
        n[0] = int(n[0] / len(char))

    return n[1]

def itter(char, r):
    for i in range(len(char)**r):
        yield base(char, i)
