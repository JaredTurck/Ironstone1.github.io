import random

def base10_real():
    n = []
    factor = 7

    # generate list of every number within a range
    for i in range(pow(10, factor)):
        n.append(f"%.{factor-1}f" % (i/pow(10, factor)))

    # randomize list
    random.shuffle(n)

    # index diagonal number
    non_indexed_num = ""
    for i in range(len(n[0])):
        non_indexed_num += n[i][i]

    print(non_indexed_num in n)

def base2_real(factor = 7, do_print=False):
    n = []

    # generate list of every number within a range
    for i in range(pow(2, factor)):
        n.append(format(i, f"#0{factor+2}b")[2:])

    # randomize list
    random.shuffle(n)

    # index diagonal number
    non_indexed_num = ""
    for i in range(len(n[0])):
        non_indexed_num += n[i][i]

    # print
    if do_print == True:
        for i in n:
            print(i)
        print(f"Non Indexed num: {non_indexed_num}")

    print(non_indexed_num in n)
