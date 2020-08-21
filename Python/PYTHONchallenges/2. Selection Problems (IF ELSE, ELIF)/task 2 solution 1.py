amount = []
for i in range(1,4):
    try:
        print("Enter amount for friend",i,end="")
        user = float(input(" £"))
        amount.append(float(user))
    except:
        print("not a valid amount")
amount = (sum(amount))
if amount < 1000:
    amount = amount + 100
elif amount in range(1000,2001):
    amount = amount * 2
print("Your total amount is £" + str(amount))
