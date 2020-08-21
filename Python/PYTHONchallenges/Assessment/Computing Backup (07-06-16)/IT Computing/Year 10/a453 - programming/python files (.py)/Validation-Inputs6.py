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

import random
position=[]
correctCode=True
for i in range(1,4):
    valid=False
    while valid ==False:
        number =random.randint(1,8)
        if number not in position:
            position.append(number)
            valid=True
    print("Enter the number at position",number,"in the passcode")
    userEntry=input()
    print("passcode",number,"=",passcode[number-1])
    if userEntry !=passcode[number-1]:
        correctCode=False
if correctCode==True:
    print("Entry Granted")
else:
    print("Passcode incorrect. Entry denied")
