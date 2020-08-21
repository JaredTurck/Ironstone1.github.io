userInput = int(input("What times table (1-12)"))
print("The",userInput,"Times Table is:")
for i in range(1,12):
    total = i*userInput
    print(userInput,"*",i,"=",total)
