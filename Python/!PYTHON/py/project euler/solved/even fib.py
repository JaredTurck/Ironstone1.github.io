def fib(n, m=4_000_000):
    a, b = [0, 1]
    output = []
    t = 0
    for i in range(n):
        if b > m:
            return t
        
        a, b = [a+b, a]
        output.append(b)
        if b % 2 == 0:
            t += b
        
    return t
        
