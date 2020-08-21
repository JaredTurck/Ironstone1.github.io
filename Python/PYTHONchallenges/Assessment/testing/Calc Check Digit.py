# choice 2 Calculate Check Digit
Digitloop = True
while Digitloop == True:
    user = int(input("Enter your 12 Digit Bar Code:\n>>> "))
    if len(user) == 12:
        print()
    else:
        print("error (1): incorect input")
