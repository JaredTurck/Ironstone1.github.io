for i in range(1024+1): #1,000,000,000 billion
    print("\t\t\t\t<tr>")
    print("\t\t\t\t\t<th>"+str(i)+"</th>")
    print("\t\t\t\t\t<th>"+str(format(i, "08b"))+"</th>")
    print("\t\t\t\t\t<th>"+str(format(i, "0x"))+"</th>")
    print("\t\t\t\t\t<th>"+str(format(i, "0o"))+"</th>")
    print("\t\t\t\t</tr>")
