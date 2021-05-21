
def calc_e(x):
    n = 1
    for i in range(x):
        n = n + (n / x)
    return n

# subtract using only addition
def sub(a, b):
    n = 0
    i = 0
    while i < a:
        i += b
        n += 1

    return n

# compare strings
def greater_then(a, b):
    if len(a) > len(b):
        return True
    elif len(b) > len(a):
        return False

    #compare each digits of the string
    for i in range(len(a)):
         if (int(a[i]) > int(b[i])):
            print([i, int(a[i]), int(b[i])])
            return True
    return ""

def grt2(a, b):
    if len(a) > len(b):
        return True
    elif len(b) > len(a):
        return False

    for i in range(len(a)):
        if int(a[i]) < int(b[i]):
            return False
        
        elif int(a[i]) > int(b[i]):
            return True
        
    return False

def divide(a, b):
    n = 0
    i = "0"
    while (int(i) < int(a)):
        i = str(int(i) + int(b))
        n += 1
    return n-1

def divide2(a, b):
    n = 0
    i = "0"
    while (int(i) < int(a)):
        i = str(int(i) + int(b))
        n += 1
    
    carry = int(i) - int(a)

    print([carry])

    # check for carry
    if carry == 0:
        return [n, carry]
    else:
        return [n-1, carry]

def divide_with_carry(a, b, prec):
    exponent, carry = divide2(a, b)
    print([exponent, carry])

    if carry == 0:
        return f"{exponent}.0"

    else:
        padding = str(carry) + ("0"*prec)
        print([padding])
    
        significand, carry2 = divide2(padding, b)
        print([significand, carry2])

        return f"{exponent}.{significand}"
    

def divide_busstop(a, b):
    len_a = len(a)
    len_b = len(b)
    
    # pad the numbers
    if len_a > len_b:
        a = ("0"*(len_a - len_b)) + a
    elif len_b > len_a:
        b = ("0"*(len_b - len_a)) + b

    # divide
    for i in range(len_a):
        counter = 0
        temp_sum = 0
        while temp_sum < int(b):
            temp_sum = temp_sum + int(a)
            counter += 1

        # carry
        carry = int(b) - temp_sum

        print([counter, temp_sum, carry])

def divide3(a, b, prec):
    carry = 0
    exponent = []
    significand = []

    # calc exponent
    for i in range(len(a)):
        x = int(a[i]) + (carry * 10)
        
        temp_sum = 0
        counter = 0

        while temp_sum < x:
            if temp_sum + int(b) > x:
                break
            else:
                temp_sum = temp_sum + int(b)
                counter += 1

        carry = x - temp_sum
        exponent.append(counter)

    # calc significand
    for i in range(prec):
        x = (carry * 10)

        temp_sum = 0
        counter = 0

        while temp_sum < x:
            if temp_sum + int(b) > x:
                break
            else:
                temp_sum = temp_sum + int(b)
                counter += 1

        carry = x - temp_sum
        significand.append(counter)

    output = str(int("".join([str(i) for i in exponent]))) + '.'
    return output + ("".join([str(i) for i in significand]))

def add(a, b):
    pass
    
        
def calc_prec(x, prec):
    n = 1
    for i in range(x):
        n = n + (n / x)
        print([n, x])
    return n

def test_grt():
    for i in range(0, 50):
        print(f'{i} > 35 = {grt2(str(i), "35")}')
