import random
user = input("Do you choose rock, paper or scissors? ")
computer = random.randint(0,100)
if 0 <= computer <= 34:
    computer = "rock"
elif 35 <= computer <= 67:
    computer = "paper"
else:
    computer = "scissors"
print("Computer:",computer,"\nUser:",user)
def compare(choice1, choice2):
    if choice1 == choice2:
        return "The result is a tie!"
    elif choice1 == "rock":
        if choice2 == "scissors":
            return "rock wins"
        else:
            return "paper wins"
    elif choice1 == "paper":
        if choice2 == "rock":
            return "paper wins"
        else:
            return "scissors wins"
answer = compare(user, computer)
print(answer)
