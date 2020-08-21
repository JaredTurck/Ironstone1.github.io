text = list(open("1text.txt","r").read())
File = list(open("1alpha.txt","r").read())
for i in range(0,len(text)):
    if text[i] in File:
        text[i] = File[File.index(text[i])+2]
print(*text,sep="")
