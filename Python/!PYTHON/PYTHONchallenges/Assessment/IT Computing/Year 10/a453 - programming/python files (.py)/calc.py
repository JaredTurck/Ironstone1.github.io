def calc():
    loop = False
    while loop == False:
        try:
            calc.menu = int(input("\nCalculater Program:\nChoose a option from the list.\n1) Add\n2) Subtract\n3) Times\n4) Divide\n>>> "))
            calc.numberOne = int(input("Enter your First number: "))
            calc.numberTwo = int(input("Enter your Second number: "))
            loop = True
        except:
            print("Only enter integers")
calc()
if calc.menu == 1: # Add
    answer = calc.numberOne + calc.numberTwo
    print(calc.numberOne,"+",calc.numberTwo,"=",answer)
if calc.menu == 2: # Subtract
    answer = calc.numberOne - calc.numberTwo
    print(calc.numberOne,"-",calc.numberTwo,"=",answer)
if calc.menu == 3: # Times
    answer = calc.numberOne * calc.numberTwo
    print(calc.numberOne,"*",calc.numberTwo,"=",answer)
if calc.menu == 4: # Divide
    answer = calc.numberOne / calc.numberTwo
    print(calc.numberOne,"/",calc.numberTwo,"=",answer)
    
