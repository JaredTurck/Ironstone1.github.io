Customer = float(input("How much did you spend in this shop? £"))
if Customer < 11:
    ten = Customer%10
    print(ten)
elif Customer > 10:
    twenty = Customer%20
    print(twenty)
