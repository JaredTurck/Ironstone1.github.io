def Hash(Text, key=54):

    bucket = dict([[i,1] for i in range(key)])
    
    for n in [ord(i) for i in Text]:
        for i in range(len(bucket)):
            if n % 4 == i:
                bucket[i] <<= 111031

    Message = ""
    bucket = [bucket[i] for i in bucket]
    for i in range(len(bucket)):
        bucket[i] ^= i ** sum([ord(i) for i in Text])

        bucket[i] = str(bucket[i] % 31)

    return hex(int("".join(bucket))).encode("utf-8")
