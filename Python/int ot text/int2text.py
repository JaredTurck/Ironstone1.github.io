

units = {
    0 : "zero",
    1 : "one",
    2 : "two",
    3 : "three",
    4 : "four",
    5 : "five",
    6 : "six",
    7 : "seven",
    8 : "eight",
    9 : "nine"
}

teens = {
    10 : "ten",
    11 : "eleven",
    12 : "twelve",
    13 : "thirteen",
    14 : "fourteen",
    15 : "fifteen",
    16 : "sizteen",
    17 : "seventeen",
    18 : "eighteen",
    19 : "ninteen"
}

tens = {
    20 : "twenty",
    30 : "thirty",
    40 : "fourty",
    50 : "fifty",
    60 : "sixty",
    70 : "seventy",
    80 : "eighty",
    90 : "ninety"
}

scale = {
    1000 : "thousand",
    1000000 : "million",
    1000000000 : "billion",
    1000000000000 : "trillion"
}

#main
def int2hundreds(i):
    '''convert a 3 digit number into text'''

    # !num is a string
    num = ["00" + str(i) if len(str(i)) == 1 else "0" + str(i) if len(str(i)) == 2 else str(i)][0]
    assert len(num) == 3 # check that the num length is equal to 3, else crash

    # if the number is in any of the dicts, then return
    if (num in units):
        return units[num]
    elif (num in teens):
        return teens[num]
    elif (num in tens):
        return tens[num]
    if int(num) == 0: return units[0]

    # if the num is not in any of the dicts then split up into sections
    
    if len(str(int(num))) == 3: # is the number 3 digits length?

        num_hundreds = units[int(num[0])] + "hundred and"

        # is the num[1] and num[2] eql to 0, e.g. '500'?
        if (num[1] + num[2] == "00"):
            return units[int(num[0])] + " hundred"
        
        else: # the num contains a tens and/or units
            num_hundreds = units[int(num[0])] + " hundred and "

            if num[1] == "0": # is the number tens eql to 0?
                return num_hundreds + units[int(num[2])]
                # example five hundred and one (tens is blank, dont display 0)
        
            elif int(num[1] + num[2]) in teens: # is the num in teens?
                return num_hundreds + teens[int(num[1] + num[2])]
                # example three hundred and eleven

            elif int(num[1] + num[2]) in tens: # is the num in tens?
                return num_hundreds + tens[int(num[1] + num[2])]
                # example eight hundred and twenty

            else:
                return num_hundreds + tens[int(num[1] + "0")] +" "+ units[int(num[2])]
                # example seven hundred and fifty eight
        
    if len(str(int(num))) == 2: # 2 digits
        if int(num[1] + num[2]) in teens:
            return teens[int(num[1] + num[2])]
            # example thirteen

        elif int(num[1] + num[2]) in tens:
            return tens[int(num[1] + num[2])]
            # example thirty

        else:
            return tens[int(num[1] + "0")] +" "+ units[int(num[2])]
            # example fifty one

    if len(str(int(num))) == 1: # 1 digit
        return units[int(num[2])]


def break_large_num_into_parts(num):
    parts = []
    number = str(num)[::-1]
    for i in range( int(len(number) / 3)+1 ):
        part = (number[i*3 : (i+1)*3])[::-1]
        if part != '':
            parts.append(part)

    return parts[::-1]

def int2text(number):
    segments = []
    
    for n in break_large_num_into_parts(number):
        segments.append(int2hundreds(n))

    return segments[0]
