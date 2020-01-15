charSet = "abcdefghijklmnopqrstuvwxyz"
for I in range(10):
    a = [i for i in charSet]
    for II in range(I):
        [print(x+i) for i in charSet for x in a]
    input()
