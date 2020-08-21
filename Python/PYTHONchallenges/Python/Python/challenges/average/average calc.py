user = print("Wellcome to the average calculator:")
values = []
while user == None:
    try:
        user = int(input("How many values would you like to enter:\n>>> "))
    except:
        print("This is not a valid Amount!")
for I in range(0,user):
    number = None
    while number == None:
        try:
            print("Enter number",I+1)
            number = float(input(">>> "))
            values.append(number)
        except:
            number = print("Please Enter a valid Number!")
average = (sum(values) / len(values))
print("Your average:",average)
