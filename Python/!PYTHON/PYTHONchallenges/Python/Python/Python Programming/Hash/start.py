import math
def Hash(Text=""):
    Text = [math.log(ord(o)) for o in Text]
    for n in range(len(Text)):
        Text[n] = int(str(Text[n]).replace(".",""))
    return Text
