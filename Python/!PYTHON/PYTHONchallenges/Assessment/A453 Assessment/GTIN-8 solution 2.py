def checkDigit_Function(code):
    code = (list(code))
    for i in range(0,7):
        if i % 2:
            code[i] = int(code[i])*3
        else:
            code[i] = int(code[i])*1
    checkDigit = sum(code) % 10
    return checkDigit
def userInput(length):
    valid = False
    while valid == False:
        print("Enter your GTIN-8,",length,"digit code:")
        user = input(">>> ")
        if user.isdigit() and len(user) == length:
            valid = True
            return user
        else:
            print("inccorect input")
menu = "None"
while not menu in ["1","2"]:
    menu = input("Choose option: \n1) Calc check digit\n2) verify validity\n>>> ")
    if menu == "1":
        lengths = 7
        user = userInput(lengths)
        checkDigit = checkDigit_Function(user)
        print("GTIN-8:",user,checkDigit)
    elif menu == "2":
        lengths = 8
        user = userInput(lengths)
        checkDigit = checkDigit_Function(user[0:7])
        if checkDigit == int(user[7]):
            print("GTIN-8:",user[:7],checkDigit,"\nYour code is VALID!")
        else:
            print("USER:",user[:7],user[7],"\nGTIN-8:",user[0:7],checkDigit,
                  "\nYour code is INVALLID!")
