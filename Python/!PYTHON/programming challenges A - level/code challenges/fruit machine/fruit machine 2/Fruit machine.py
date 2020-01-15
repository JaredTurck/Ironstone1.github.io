import random

def display(value):
    FruitDisplay = []
    
    for line in range(9):
        for item in value:
            FruitDisplay.append(fruit[item][line][0])
            
    return file % tuple([balance] + FruitDisplay + [" "*41])

def wins(value, balance):
    valueSet = len(value) - len(set(value))
    conditions = {0:[value.count("skull") == 2,-1.00],
                  1:[valueSet == 1,+0.50],
                  2:[value.count("bell") == 3, +5.00],
                  3:[value.count("skull") == 3, -999999],
                  4:[valueSet == 2,+1.00]}

    for i in conditions:
        if conditions[i][0] == True:
            return round((balance + conditions[i][1])- 0.20,2)
    else:
        return round(balance - 0.20,2)

FruitList = ["cherry","bell","lemon","orange","star","skull"]
balance, user = 1.0, ""

file = open("display.txt").read()
fruit = eval(open("fruit.txt").read())


while balance > 0 and user != "exit":
    value = [FruitList[random.randint(0,5)] for i in range(3)]

    print(display(value))

    balance = wins(value, balance)
    user = input("Enter to continue, exit to quit: ")
