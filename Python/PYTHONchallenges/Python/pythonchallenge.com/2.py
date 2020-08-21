file = list(open("2Text.txt","r").read())
newlist = []
for x in range(0,100):
    newlist.append([0,"~"])
Ascii = list(open("alpha.txt","r").read())
for i in range(0,len(file)):
    for a in range(0,len(Ascii)):
        if file[i] == Ascii[a]:
            newlist[a][0] = newlist[a][0] + 1
        newlist[a][1] = Ascii[a]
print("No. Letters: "," "*6,"Letter:")
for y in range(0,len(newlist)):
    if newlist[y][0] != 0:
        if newlist[y][0] == 1:
            print(newlist[y][0]," "*18,newlist[y][1])
        else:
            print(newlist[y][0]," "*15,newlist[y][1])
