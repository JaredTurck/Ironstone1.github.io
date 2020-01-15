from random import randint
computer = randint(1,3)
print(computer)
winner = user = None
while user not in ["1","2","3"]:
    user = input("Enter your Choice:\n1) ROCK\n2) PAPER \n3) SCISSORS\n>>> ")
    if user == computer:
        print("Draw")
    if user in ["1"]:
        if computer in ["2","3"]:
            winner = ("You lose, Computer wins!")
    elif user in ["2"]:
        if computer in ["3"]:
            winner = ("You lose, Computer wins!")
    if computer in ["1","2"]:
        if user in ["3"]:
            winner = ("You Win!")
    elif computer in ["1"]:
        if user in ["2"]:
            winner = ("You Win!")
    else:
        print("Inccorect input!")
print(winner)
