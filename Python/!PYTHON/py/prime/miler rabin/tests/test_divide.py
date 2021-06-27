

def test_divide(n):
    r = 0
    s = n - 1
    while s % 2 == 0:
        r += 1
        s //= 2

    return r

def get_rows2(n):
    items = []
    for i in range(4, n, 8):
        row = ",".join([str(test_divide(x)) for x in range(i, i+8)])
        items.append(row[10])

    rows2 = [items[i : i + 8][-1] for i in range(0, len(items), 8)][:-1]
    [print(i, end=",") for i in rows2]

def get_rows2_2(n):
    items = []
    for i in range(4, n, 8):
        row = []
        for x in range(i, i+8):
            row.append(str(test_divide(x)))
            
        #row = ",".join(row)
        
        items.append(row[5]) # it's counting commas too

    rows2 = [items[i : i + 8][-1] for i in range(0, len(items), 8)][:-1]
    [print(i, end=",") for i in rows2]    

def get_rows4():
    items = []
    row = []
    for i in range(4, 1_000_000):
        if i % 1032 == 0:
            items.append(",".join(row))
            row = []
        else:
            row.append(str(test_divide(i)))

    with open("file.txt", "w") as file:
        file.write("\n".join(items))

fixed_patern = [1,2,4,7,4,2,3,6,3,6,8,5,3,2,3,6,8,4,2,3,5,6]
def test_fixed_patern(n):
    return fixed_patern[n % len(fixed_patern)]

def test_rows4():
    count = 2
    while True:
        items = []
        row = []
        for i in range(4, (count * 3)+4):
            if i % count == 0:
                items.append(",".join(row))
                row = []
            else:
                row.append(str(test_divide(i)))

        if items[0] != items[1]:
            count += 1
            if count % 100 == 0:
                print(f"Tried {count}!")
        else:
            return count
    

def get_rows():
    output = []
    for i in range(4, 7_000):
        output.append(str(test_divide(i)))
    with open("file.txt", "w") as file:
        file.write(",".join(output))

def get_rows3():
    output = []
    for i in range(4, 7_000, 16):
        output.append(",".join([str(test_divide(x)) for x in range(i, i+16)]))

    with open("file.txt", "w") as file:
        file.write("\n".join(output))
