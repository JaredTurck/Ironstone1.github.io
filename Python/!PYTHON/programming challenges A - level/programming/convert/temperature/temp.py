def convert(From, To, n):
    Data = {"fc" : (n-32)*5/9,
            "cf" : (n*9/5)+32,
            "cc" : n, "ff": n}

    return Data[From + To]
