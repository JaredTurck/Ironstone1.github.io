value = False
while value == False:
    try:
        number = int(input("Please enter a number between 1 and 5: "))
        if number <1 or number> 5:
            number = int(input("Please enter a number between 1 and 5: "))
            value = True
        else:
            value = True
    except:
        print("error incorrect input\n")
print("you have chosen the number ",number)


        

        
