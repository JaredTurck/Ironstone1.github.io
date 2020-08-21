while True:
    try:
        friend1 = int(input("Enter amount for friend 1: £"))
        friend2 = int(input("Enter amount for friend 2: £"))
        friend3 = int(input("Enter amount for friend 3: £"))
        break
    except:
        print("Not a valid amount!")
total = friend1 + friend2 + friend3
if total < 1000:
    total = total + 100
elif total in range(1000,2001):
    total = total *2
print("You have raised £" + str(total))
