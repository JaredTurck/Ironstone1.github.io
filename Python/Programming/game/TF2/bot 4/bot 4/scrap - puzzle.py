import itertools

Format = "Xxxxxxxx Xxxxxxx"
char = "abcdefghijklmnopqrstuvwxyz"
cast = {"X" : "upper", "x" : "lower"}

word = Format.replace(" ","")
for i in itertools.combinations_with_replacement(char, len(word)):
    

    #element = driver.find_element_by_id("raffle-password")
    #element.send_keys(password)

def CastTo(password):
    password = list(password)
    for x in enumerate(word):
        password[x[0]] = getattr(password[x[0]], cast[x[1]])()

    password = "".join(password)

# get iteration, for each word
