print("Enter a number, the program will then display every square number up intill your input!")
user = None
while user == None:
    try:
        user = int(input(">>> "))
        print("SQUARE NUMBERS FROM: 1 TO",user)
        for i in range(1,user+1):
            print(i,"*",i,"=",i*i)
    except:
        print("Invalid input!")
