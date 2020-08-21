def morse(Text):
    file = open("data.csv").readlines()
    char = dict([i.replace("\n","").split(",") for i in file])
    Morse = ""

    for i in Text.upper().replace("\n",""):
        try:
            Morse += char[i]
        except:
            if i == ",":
                Morse += "--••--"
            else:
                Morse += "#"

    return Morse
