print("coins")
oneP = int(input("how maney 1p coins do you have"))
twoP = int(input("how maney 2p coins do you have"))
fiveP = int(input("how maney 5p coins do you have"))
tenP = int(input("how maney 10p coins do you have"))
twentyP = int(input("how maney 20p coins do you have"))
fiftyP = int(input("how maney 50p coins do you have"))
onePound = int(input("how maney £1 coins do you have"))
twoPound = int(input("how maney £2 coins do you have"))
print("notes")
fivePound = int(input("how maney £5 coins do you have"))
tenPound = int(input("how maney £10 coins do you have"))
twentyPound = int(input("how maney £20 coins do you have"))
fiftyPound = int(input("how maney £50 coins do you have"))
total = (oneP/100 + twoP/50 + fiveP/20 + tenP/10 + twentyP/5 + fiftyP/2 + onePound*1
         + twoPound*2 + fivePound*5 + tenPound*10 + twentyPound*20 + fiftyPound*50)
print("you have £",total,"in the pigy bank")
if total <= 50:
    print("Save More")
elif total >= 50:
    print("WellDone")
else:
    print()
input()

