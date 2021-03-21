scores=[["Hugh",23],["Pugh",45],["Barney",76],["MaGrue",42]]
for entry in sorted(scores,reverse=True):
    print(entry)
newlist=[[x[1],x[0]] for x in scores]
for entry in sorted(newlist):
    print(entry)
print("Scores=",scores)
print("Newlist=",newlist)
