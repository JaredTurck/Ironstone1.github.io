print("coins:")
one = int(input("how maney pennies do you have: "))
two = int(input("how maney 2 pence do you have: " ))
five = int(input("how maney 5 pence do you have: " ))
ten = int(input("how maney 10 pence do you have: " ))
twenty = int(input("how maney 20 pence do you have: "))
fifty = int(input("how maney 50 pence do you have: "))
onePound = int(input("how maney £1 do you have: "))
twoPound = int(input("how maney £2 do you have: "))
print("notes:")
fivePoundNotes = int(input("how maney £5 notes do you have: "))
tenPoundNotes = int(input("how maney £10 notes do you have: "))
twentyPoundNotes = int(input("how maney £20 notes do you have: "))
fiftyPoundNotes = int(input("how maney £50 notes do you have: "))
totalCoins = (one/100 + two/50 + five/20 + ten/10 + twenty/5 + fifty/2 + onePound*1 + twoPound*2)
totalNotes = (fivePoundNotes*5 + tenPoundNotes*10 + twentyPoundNotes*20 + fiftyPoundNotes*50)
print("you have £",totalCoins+totalNotes," in the Piggy Bank")
input()
