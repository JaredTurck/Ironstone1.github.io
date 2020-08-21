File = open("text.txt").read()
List = []
for i in range(0,len(File)-3):
    valid = False
    for a in range(1,4):
        if File[i+3].islower()==True:
            if File[(i+3)-a].isupper()!=True:
                if File[(i+3)+a].isupper()!=True:
                    valid = True
    if valid == True:
        List.append(File[i+3])
print(*List)
# 1 lower case letter surounded by EXACTLY 3 upper case letters.
# XXX x XXX
