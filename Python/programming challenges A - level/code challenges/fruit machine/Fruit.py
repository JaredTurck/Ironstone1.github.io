import random

fruit = {0:"Cherry", 1:" Bell ", 2:"Lemon ", 3:" Star ", 4:"Skull "}

file = user = open("display3.txt", encoding="utf8").read()
balance = 1.00

def wins(value):
    valueSet = len(value) - len(set(value))
    if valueSet == 1:
        if value.count(fruit[4]) == 2:
            return [-1.00,"      You lost £1 for 2 skulls!     "]
        else:
            return [+0.50,"You win 50p for 2 of the same fruit!"]

    elif valueSet == 2:
        if value.count(fruit[1]) == 3:
            return [+5.00,"      You win £5 for 3 Bells!       "]
        elif value.count(fruit[4]) == 3:
            return [-999999,"    Game over! you got 3 skulls!    "]
        else:
            return [+1.00,"You win £1 for 3 of the same fruit! "]
    else:
        return [0," "*36]

while balance > 0 and user != "exit":
    value = [fruit[random.randint(0,4)] for i in range(3)]
    print(file % tuple(["%02s" %balance]+value+[wins(value)[1]]))

    balance = round((balance + wins(value)[0]) - 0.20, 2)
    user = input("\nENTER to continue, exit to quit: ")

input("\nGame Over, You won £%s!" % ([0 if balance <= 0 else balance][0]))
