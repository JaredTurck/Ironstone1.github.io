choiceloop, total, loop = True, 0, True
def EAN13():
    while loop == True:
        try:
            fullcode = int(input("Enter your EAN13 code"))
        except:
            print("incorrect input: please only enter numbers")
    
while choiceloop == True:
    try:
        choice = int(input("Menu:\nChoose a option from the list bellow:",
        "1) Check Bar Code \n2) Calculate Check Digit\n>>> "))
        if choice == 1:
            EAN13()
            for i in range(0,11):
                if i % 1:
                    fullcode(i) = fullcode(i)*3
                total = total + fullcode(i)
        elif choice == 2:
            EAN13()
        else:
            print("incorrect input: please enter a choice from the list")
    except:
        print("incorrect input: please only enter numbers")
