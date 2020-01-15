def word(Text, reverse=False):
    if reverse == True:
        return Text[::-1]
    elif reverse == False:
        return " ".join([i for i in Text.split(" ")][::-1])
    return Text
