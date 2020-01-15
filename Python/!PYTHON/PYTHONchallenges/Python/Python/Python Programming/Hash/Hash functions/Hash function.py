def Hash1(Text):
    while len(Text) < 1024:
        Text += b"@"

    n = "".join([str(Text[n] * 256 ^ n) for n in range(len(Text))])
    return hex(int(n) >> 16522).encode("utf-8")

def check():
    found = []
    for i in range(10000):
        n = Hash2(str(i))
        if n in found:
            print("Found a duplicate!")
            break
        else:
            found.append(n)
    else:
        print("Unable to find duplicates!")

def Hash2(Text, Hashlength = 128):
    def vigenere(Text, key):
        cipher = []
        for i in range(len(Text)):
            cipher.append(Char[(Char.index(Text[i]) + \
                    Char.index(key[i % len(key)])) % len(Char)])
        return "".join(cipher)

    def factorial(n):
        if n == 1: return 1
        else:
            number = n*factorial(n -1)
        return number

    def prime(n):
        def num(n):
            if n < 2:
                return False
            elif n in [2,3]:
                return True
            for i in range(2,n-1):
                if n % i == 0:
                    return False
            return True
        while num(n) != True:
            n += 1
        return n


    Char = "".join([chr(i) for i in range(32,127)])

    Text += "$"
    while len(Text) < Hashlength:
        for i in range(2):
            if i % 2 == 0:
                Text += Text[len(Text)-1]
            else:
                Text += Text[0]
        Text += Char[len(Text) % len(Char)]

    key1 = "".join([Text[(2**i) % len(Text)] for i in range(Hashlength)])
    cipher1 = vigenere(Text, key1)

    key2 = ""
    for i in range(Hashlength):
        key2 += Char[factorial(Char.index(cipher1[i])) % len(Char)]
    cipher2 = vigenere(cipher1, key2)
    return cipher2
