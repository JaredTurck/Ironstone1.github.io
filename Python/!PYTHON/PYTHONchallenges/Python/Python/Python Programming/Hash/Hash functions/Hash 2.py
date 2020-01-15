def Hash(key):
    key = str(key)
    while len(key) < 12:
        key += " "
    
    total = 0
    key = [ord(o) for o in key]
    for i in range(0,len(key),2):
        total += int( str(key[i]) + str(key[i-1]) )

    key = "".join([str(i % 101) for i in key])

    n = (total % 999978 * int(key))^31
    
    return hex(n)
