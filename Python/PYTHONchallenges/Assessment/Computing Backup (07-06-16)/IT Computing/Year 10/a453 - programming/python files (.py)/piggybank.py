needed = 20
inPiggyBank = 10.50
extra = float(input("how much extras money do you have? "))
totals = (inPiggyBank + extra)
if totals >= needed:
    print ("we have enough")
else:
    print ("sorry we need more")

input("")
