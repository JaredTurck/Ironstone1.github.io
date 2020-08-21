valid = False
while valid == False:
    password = input("Please enter your password: ")
    length, digit, upper, lower, other, valid, = False, False, False, False, False, False

    if len(password)>=6 or len(password)<=12:
        length = True
    for letter in password:
        if letter.isdigit:
           digit = True
           if letter in password:
                digit = True
                if letter.isupper():
                    upper = True
                    if letter.islower():
                        lower = True
                        other = True
                    else:
                        print("error: you password does not have a lower case letter")
                else:
                    print("error: you password does not have a upper case letter")
           else:
                print("letter not in password")
        else:
            print("eror: you password does not have between 6 and 12 letters")
        
       
    if digit == upper == lower == True and length == True:
            print("password accepted")
            valid = True
    else:
            print("password does not meet complexity")
            password = input("Try Agin please enter password: ")
