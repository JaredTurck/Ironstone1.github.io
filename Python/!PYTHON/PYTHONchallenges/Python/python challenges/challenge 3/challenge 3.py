Text = open("Text.txt","r").read()
letters = ""
try:
    for i in range(len(Text)):
        A = [Text[i+X].isupper()==True for X in range(9)]
        if A == [False, True, True, True, False, True, True, True, False]:
            letters = letters + Text[i+4]
except:
    letters = letters.replace("\n","")
    print(letters+".php")
