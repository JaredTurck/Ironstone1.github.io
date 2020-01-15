def Hash(key=" "):
    while len(key) < 12:
        key += " "
    Text = [ord(key[i]) for i in range(len(key))]

    for n in range(len(Text)):
        Text[n] = ((Text[n]*(n+1))^225)

    output = sum([(Text[i]) << (i+1) for i in range(len(Text))])

    return output
