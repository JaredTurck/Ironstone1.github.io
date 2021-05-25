
def add1(x, y):
    return x--y

def add2(x, y):
    return sum([x, y])

def add3(x, y):
    return eval("".join([str(x), chr(43), str(y)]))

def add4(x, y):
    while y != 0:
        c = x & y
        x = x ^ y
        y = c << 1
    return x

print(add1(1, 6))
print(add2(1, 6))
print(add3(1, 6))
print(add4(1, 6))
