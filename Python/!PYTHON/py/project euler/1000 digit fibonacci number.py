
def fib():
    a, b = [0, 1]
    output = []
    while True:
        a, b = [a+b, a]
        output.append(b)

        if len(str(b)) == 1000:
            return [len(output)-1, b]
        
print(fib())
