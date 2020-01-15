valid = True
while valid == True:
    try:
        friend1 = float(input("Enter amount for friend 1: £"))
        friend2 = float(input("Enter amount for friend 2: £"))
        friend3 = float(input("Enter amount for friend 3: £"))
        valid = False
    except:
        print("Not a valid amount!")
total = friend1 + friend2 + friend3
if total < 1000:
    total = total + 100
elif total in range(1000,2001):
    total = total *2
print("You have raised £" + str(total))
