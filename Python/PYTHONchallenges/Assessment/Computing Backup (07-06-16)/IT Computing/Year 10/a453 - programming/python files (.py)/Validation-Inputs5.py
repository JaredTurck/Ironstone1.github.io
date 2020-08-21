passcode =""
for number in range(1,9):
    valid=False
    while valid ==False:
        print("Enter digit number",number,"of the passcode")
        digit=input()
        if len(digit)>1:
            print("Please enter only a single digit")
        else:
            if digit.isdigit()==False:
                print("Please enter only numbers")
            else:
                passcode=passcode+digit
                valid=True
print("your complete passcode is", passcode)
