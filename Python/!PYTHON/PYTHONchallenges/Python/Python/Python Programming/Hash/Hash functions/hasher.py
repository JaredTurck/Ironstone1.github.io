import math
def Hash(Text):
    
    Text = int("".join([str(ord(i)) for i in str(Text)]))

    cipher = str(math.log(Text)).replace(".","")
    while len(cipher) < 17: cipher += "1"

    return int("1"+cipher) << 48

