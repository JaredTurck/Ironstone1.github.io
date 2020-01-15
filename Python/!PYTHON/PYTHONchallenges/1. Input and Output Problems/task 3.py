valid = True
while valid == True:
    try:
        carbon = int(input("Enter the number of Carbon atoms? "))
        valid = False
    except:
        print("Not a valid number of carbon atoms!")
hydrogen = (carbon*2)+2
chemical = "C" + str(carbon) + "H" + str(hydrogen)
mass = 12*carbon + 1*hydrogen
print("The molecular mass of",chemical,"is",mass)
