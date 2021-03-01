#def hasher(text, h=1):
#    for i in range(1, len(text)):
#        h = ((h << 5) - h) + ord(text[i])
#    return int(str(h << 32)[:8])

def hashcode(text):
    h = 0;
    if (len(text) == 0):
        return h

    for i in range(len(text)):
        c = ord(text[i])
        h = ((h << 5) - h) + c
        h = h & h
        
    return h

def test_hash(text):
    h = 2**32
    text = text + ("0"*32)

    for i in range(len(text)):
        h = (ord(text[i])*31 ** (len(text)-1))
        h = h >> (h.bit_length()-32)

    return h
