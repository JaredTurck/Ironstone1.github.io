import random
Char = "".join([chr(i) for i in range(32,127)])
Char = "abcdefghijklmnopqrstuvwxyz"

def reverse(Text):
    return Text[::-1]

def caesar(Text, shift):
    cipherText = list(Text)
    
    for i in range(len(cipherText)):
        cipherText[i] = Char[Char.index(Text[i])+(shift % len(Char))]
    return "".join(cipherText)

def vigenere(message, key):
    cipher = []
    for i in range(len(message)):
        cipher.append(Char[(Char.index(message[i]) + \
                Char.index(key[i % len(key)])) % len(Char)])
    return "".join(cipher)

def unbreakable(message):
    rand = [random.randint(0,len(Char)-1) for i in range(len(message))]
    key = "".join([Char[i] for i in rand])
    return vigenere(message, key)
