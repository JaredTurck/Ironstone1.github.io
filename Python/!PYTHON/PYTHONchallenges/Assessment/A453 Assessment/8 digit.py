Menu = input("Please choose from Menu bellow:\n1) Calculate Checkdigit\n2) check validity of code\n>>> ")
while Menu not in ["1","2"]:
    Menu = input("Not a valid Option Please Try Again!\n>>> ")

def Calc_Checkdigit():
    code = "Invalid"
    while not type(code) == list:
        code = input("Enter your code: ")
        if code.isdigit() and len(code) == 7:
            code = list(code)
        else:
            print("Your code just be 7 digits, you have input a",len(code),"digit code!")
    newlist = []
    for i in range(0,len(code)):
        if i % 2:
            newlist.append(int(code[i])*1)
        else:
            newlist.append(int(code[i])*3)
    checkDigit = sum(newlist) % 10
    return checkDigit
if Menu == "1":
    checkDigit = Calc_Checkdigit()
    print("Check Digit: ",checkDigit)
elif Menu == "2":
    valid = False
    while valid == False:
        try:
            user = int(input("Enter your Full GTIN-8 code, Including Check Digit: "))
            if len(user) == 8:
                valid = True
        except:
            print("Not valid!")
    checkDigit = Calc_Checkdigit()
    if checkDigit == user:
        print("Your GTIN-8 code is VALID!")
    else:
        print("Your GTIN-8 code is INVALID!")
