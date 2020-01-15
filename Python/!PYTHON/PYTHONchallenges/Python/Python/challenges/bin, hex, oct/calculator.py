#bin()
#hex()
#oct()
# format(num, "b/x/o")
while True:
          menu = input("Menu:\n1) calculate bin, hex, oct, from set of numbers\n2) calcuate bin, oct, hex from range of numbers\n3) convert string to binary\n>>> ")
          while not menu in ["1","2","3"]:
                    menu = input("Inccorect Input!\n>>> ")
          if menu == "1":
                    numberList, Continue, value = [], "Y", ["08b","x","o","Binary","Hexadecimal","octal"]
                    while Continue.upper() == "Y":
                              number = input("Enter a number: ")
                              while number.isdigit()!=True:
                                        number = input("Not a valid input!\nEnter a number: ")
                              numberList.append(int(number))
                              Continue = input("Would you like to enter another number? 'Y' OR 'N':\n>>> ")
                              while not Continue.upper() in ["Y","N"]:
                                        Continue = input("Inccorect Input!\n>>> ")
                    print("\nNumber in List format:")
                    [([print(value[x+3],format(numberList[I], value[x]),"\n",end=" \a ") for x in range(3)],print("NUMBER: ",numberList[I])) for I in range(len(numberList))]
                    print("\nNumber in Grid format:")
                    [print(value[3],bin(numberList[I]),value[4],hex(numberList[I]),value[5],oct(numberList[I]),sep="\t") for I in range(len(numberList))]
          elif menu == "2":
                    start, end = input("Enter the start value: "), input("Enter end value: ")
                    while (start+end).isdigit()!=True:
                              start, end = input("Inccorect Input\nstart value: "), input("End value: ")
                    for I in range(int(start), int(end)+1):
                              print("Number:",I,"Bin:",bin(I),"Hex:",hex(I),"Oct:",oct(I),sep="\t")
          elif menu == "3":
                    string = input("Enter your Text: ")
                    print("Grid:"),[print(string[x],"\t",format(ord(string[x]), "08b")) for x in range(len(string))]
                    print("\nBin:"),[print(format(ord(string[x]), "08b"),end=" ") for x in range(len(string))]
          Exit = input("\n\nPress enter to continue to main menu or type EXIT to leave: ")
          if Exit.upper() == "EXIT":
                    exit()
