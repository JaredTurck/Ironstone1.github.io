file = ("g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj.")
Text = []
for i in range(len(file)):
    if file[i].isalpha()==True:
        Text.append(chr(ord(file[i])+2))
    else:
        Text.append(file[i])
    if ord(Text[i]) > 122:
        Text[i] = chr(ord(Text[i])-26)
print(*Text,sep="")
