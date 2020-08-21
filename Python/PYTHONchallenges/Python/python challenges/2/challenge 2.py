text = list(open("text.txt").read())
Ascii = open("ascii.txt").read()
newList = []
for new in range(0,len(Ascii)):
    newList.append(["*",0])
for i in range(0,len(text)):
    for a in range(0,len(Ascii)):
        if text[i] == Ascii[a]:
            newList[a][1] = newList[a][1] + 1
            newList[a][0] = text[i]
for b in range(0,len(newList)):
    if newList[b][1] != 0:
        print(*newList[b])
print("equality")
