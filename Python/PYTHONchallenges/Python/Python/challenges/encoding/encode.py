counter = 0
Continue = True
while Continue == True:
        file = open("encodingTable.txt","w", encoding="utf-8")
        counter += 1
        file.write(chr(counter)), file.close()
