total = 0
for i in range(3):
    amount = input("Enter amount for friend "+str(i+1)+": ")
    while amount.isdigit()!=True:
        amount = input("Not a valid amount!\n>>> ")
    total += int(amount)
if total < 1000:
    total += 100
elif 1000 <= total <= 2000:
    total = total*2
print("You have rasied £"+str(total),"Welldone!")
