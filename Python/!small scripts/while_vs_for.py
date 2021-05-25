import timeit

def while_loop(n=10_000_000):
    i = 0
    s = 0
    while i < n:
        s += i
        i += 1
    return s

def for_loop(n=10_000_000):
    i = 0
    s = 0
    while i < n:
        s += i
        i += 1
    return s

print("while loop\t", timeit.timeit(while_loop, number=1))
print("for loop\t", timeit.timeit(for_loop, number=1))
