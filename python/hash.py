# Get input message B as positive integer
# B is padded so it's length (in bits) is a multiple of 16
# B is equally broken into 4 parts
# pass each word is through functions A,B,C,D.
# concade results

def main(B):
    B = "".join([bin(ord(i))[2:] for i in str(B)]) + "1"
    while len(B) % 16 != 0: B += "0"
    
    L = int(len(B)/4)
    word = [int(B[L*0 : L*1], 2),
            int(B[L*1 : L*2], 2),
            int(B[L*2 : L*3], 2),
            int(B[L*3 : L*4], 2)]

    Digest = b""
    for i in cycle(word):
        if i < 0: i = ~i
        Digest += hex(i >> (len(bin(i)[2:]) -64))[2:].encode("ascii")

    return Digest
    

def cycle(N):
    A = 0x1
    B = 0x3
    C = 0x7
    D = 0xf
    com = 0x565c976c9cbdfccb24e161bf83cb2a027aa3903723ae4680000000000000000000

    N[0] = (N[0] << A) + (N[1] << B) + (N[2] << C) + (N[3] << D) - 0x74502233
    N[1] = (N[0] << B) + (N[1] << C) + (N[2] << D) + (N[3] << A) - 0x22148754
    N[2] = (N[0] << C) + (N[1] << D) + (N[2] << A) + (N[3] << B) - 0x21598063
    N[3] = (N[0] << D) + (N[1] << A) + (N[2] << B) + (N[3] << C) - 0x16625163
    N[0] = int((N[0]%com ** 0.2) * (10**8))

    N[0] = (N[0] << A) + (N[0] << C) + (N[0] << B) + (N[0] << D) - 0x61869700
    N[1] = (N[1] << C) + (N[1] << B) + (N[1] << D) + (N[1] << A) - 0x33448723
    N[2] = (N[2] << B) + (N[2] << D) + (N[2] << A) + (N[2] << C) - 0x21598063
    N[3] = (N[3] << D) + (N[3] << A) + (N[3] << C) + (N[3] << B) - 0x65450854
    N[1] = int((N[1]%com ** 0.2) * (10**8))

    N[0] = (N[0] << A) + (N[2] << C) + (N[1] << B) + (N[2] << D) - 0x93150505
    N[1] = (N[1] << A) + (N[3] << C) + (N[0] << B) + (N[3] << D) - 0x05330692
    N[2] = (N[0] << A) + (N[2] << C) + (N[1] << B) + (N[2] << D) - 0x32452891
    N[3] = (N[1] << A) + (N[3] << C) + (N[0] << B) + (N[3] << D) - 0x83513264
    N[2] = int((N[2]%com ** 0.2) * (10**8))

    N[0] = (N[3] << A) + (N[0] << C) + (N[1] << B) + (N[0] << D) - 0x81851883
    N[1] = (N[2] << A) + (N[3] << C) + (N[2] << B) + (N[3] << D) - 0x05304048
    N[2] = (N[1] << A) + (N[2] << C) + (N[3] << B) + (N[2] << D) - 0x93737457
    N[3] = (N[0] << A) + (N[1] << C) + (N[0] << B) + (N[1] << D) - 0x72776969
    N[3] = int((N[3] ** 0.2) * (10**8))

    


    return [N[0] << 64, N[1] << 64, N[2] << 64, N[3] << 64]
