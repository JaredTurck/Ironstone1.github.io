'''
    convert an integer to text.
'''

Units = {
        0 : "",
        1 : "One",
        2 : "Two",
        3 : "Three",
        4 : "Four",
        5 : "Five",
        6 : "Six",
        7 : "Seven",
        8 : "Eight",
        9 : "Nine"
    }

Tens = {
        00 : "",
        10 : "Ten",
        11 : "Eleven",
        12 : "Twelve",
        13 : "Thirteen",
        14 : "Fourteen",
        15 : "Fifteen",
        16 : "Sixteen",
        17 : "Seventeen",
        18 : "Eighteen",
        19 : "Nineteen",
        20 : "Twenty",
        30 : "Thirty",
        40 : "Fourty",
        50 : "Fifty",
        60 : "Sixy",
        70 : "Seventy",
        80 : "Eighty",
        90 : "Ninty"
    }

Hundreds = {
        100 : "One hundred",
        200 : "Two hundred",
        300 : "Three hundred",
        400 : "Four hundred",
        500 : "Five hundred",
        600 : "Six hundred",
        700 : "Seven hundred",
        800 : "eight hundred",
        900 : "nine hundred"
    }

Scale = {
        1 : "",
        1000 : "thousand",
        1000000 : "million",
        1000000000 : "billion",
        1000000000000 : "trillion",
        1000000000000000 : "quadrillion",
        1000000000000000000 : "quitillion",
        1000000000000000000000 : "sextillion",
        1000000000000000000000000 : "septillion",
        1000000000000000000000000000 : "octillion",
        1000000000000000000000000000000 : "nonillion",
        1000000000000000000000000000000000 : "decillion",
        1000000000000000000000000000000000000 : "undecillion",
        1000000000000000000000000000000000000000 : "duodecillion",
        1000000000000000000000000000000000000000000 : "tredecillion",
        1000000000000000000000000000000000000000000000 : "quattuordecillion",
        1000000000000000000000000000000000000000000000000 : "quindecillion",
        1000000000000000000000000000000000000000000000000000 : "sexdecillion",
        1000000000000000000000000000000000000000000000000000000 : "septendecillion",
        1000000000000000000000000000000000000000000000000000000000 : "octodecillion",
        1000000000000000000000000000000000000000000000000000000000000 : "novemdecillion",
        1000000000000000000000000000000000000000000000000000000000000000 : "vigintillion",
    }


# break number up into blocks of 3

def hundred(N):
    assert [True if (type(N) == int or 0 <= N <= 999) else False][0]
    if (N in Units or N in Tens or N in Hundreds):
        return [Units[N] if N in Units else Tens[N] if N in Tens else Hundreds[N]][0]
    else:
        N = str(N); N = ("0" * (3 - len(N))) + N
        hundreds = ["" if N[0] == "0" else Units[int(N[0])] + " hundred and "][0]
        return hundreds + Tens[int(N[1]+"0")] + " " + Units[int(N[2])]
    

def num2text(n):
    assert type(n) == int or len(str(n)) <= len(str(sorted(list(Scale.keys()))[-1]))
    parts = (lambda x : [x[i*3:(i+1)*3] for i in range(int(len(x)/3))])(("0" * (3-(len(str(n)) % 3))) + str(n))
    parts_txt = ", ".join([hundred(int(parts[i])) + " " + Scale[int("1" + ("000" * (len(parts)-1-i)))]
             for i in range(len(parts)) if (hundred(int(parts[i])) != "")])
    return (lambda x : [x[:-1]] if x[-1] == " " else x)(["Zero" if n == 0 else parts_txt][0].replace("  ",""))[0]
