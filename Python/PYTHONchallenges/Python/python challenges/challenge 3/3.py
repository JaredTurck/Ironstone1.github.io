Text = open("Text.txt").read()
for i in range(len(Text)):
    if Text[i].islower()==True:
        if ([Text[(i-1)-x].isupper() for x in range(3)] == [True, True, True]
        and [Text[(i+1)+y].isupper() for y in range(3)] == [True, True, True]
        and Text[i-4].islower()==True and Text[i+4].islower()==True):
            print(Text[i],end="")
