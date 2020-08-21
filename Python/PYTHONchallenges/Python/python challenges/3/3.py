File = open("File.txt","r").read() #XXXxXXX
NewList = []
for i in range(0,len(File)):
    if (File[i].isupper() and File[i+1].isupper()
        and File[i+2].isupper() and File[i+3].isupper()==False
        and File[i+4].isupper() and File[i+5].isupper()
        and File[i+6].isupper()):
        pass
    else:
        NewList.append(File[i+3])
print(len(NewList))
