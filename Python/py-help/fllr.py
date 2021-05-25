
def FLLR(sentence):
    alpha = "abcdefghijklmnopqrstuvwxyz"
    output = ""
    
    for word in sentence.split(" "):
        current = word[0] + word[-1]
        for letter in current:
            output += str(alpha.index(letter.lower()))

    return output
