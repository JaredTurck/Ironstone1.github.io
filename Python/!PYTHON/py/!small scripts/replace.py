

def replace(Str, subStr, strRpc):
    output = "";

    for i in range (Str.count(subStr)):
        if Str.find(subStr) > -1:
            output += Str[:Str.find(subStr)] + strRpc
            print(Str)
            Str = Str[Str.find(subStr)+len(strRpc)-1:]
            print(Str)

    return output + Str
