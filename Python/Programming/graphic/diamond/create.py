def Diamond(size):
    for n in (lambda x : x[:-1]+x[::-1])([size-i-1 for i in range(size)]):
        row = ["-" if i != n else "*" for i in range(size)]
        print(["".join(row[:-1] +["*"]+ row[size-2::-1]) if n != 0 else "*"*(size*2-1)][0])
