text = list(open("text.txt").read())
Ascii = open("ascii.txt").read()
for i in range(0,len(text)):
    if text[i] in Ascii:
        text[i] = Ascii[Ascii.index(text[i])+2]
print(*text,sep="")
