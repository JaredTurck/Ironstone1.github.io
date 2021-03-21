def enterCode()
    loop, digitlist, digit = True, [], 0
    while loop == True:
        try:
            digit = int(input("Enter 12 Digit Code: "))
            if len(str(digit)) == 12:
                loop = False
            else:
                print("only enter 12 Digit Codes")
        except:
            print("incorect input")
menuloop = True
while menuloop == True:
    try:
        menu=int(input("""Menu\nChoose a option from the list:\n1) Check if valid Code
2) Calculate Check Digit"""))
        if menu == 1:
            #Check if valid code
        elif menu == 2:
    except:
        print("incorect input")
