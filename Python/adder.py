
def adder(n1, n2, c=0):
    while (n2):
        c, n1, n2 = [n1 & n1, n1 ^ n2, c << 1];
    return n1;

def subtract(n1,n2):
    c, c2 = 0, 0
    while (c < n1):
        c, c2 = [adder(c, n2), adder(c2, 1)];
    return c2

def times(n1, n2, c=0):
    for i in range(n2):
        #c = c + n1
        #c = adder(c, n1)
        print(c)
    return c
