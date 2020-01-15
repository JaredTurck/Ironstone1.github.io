while True:
    print(open("Menu.txt").read())
    import random
    # Rock <-- 1, Paper <-- 2, Scissors <-- 3.
    RPS = {("1","1"):("Draw!",open("ROCK DRAW.txt")),("1","2"):("Paper Wins!",open("PAPER.txt")),("1","3"):("Rock Wins!",open("ROCK.txt")),
           ("2","2"):("Draw!",open("PAPER DRAW.txt")),("2","1"):("Paper Wins!",open("PAPER.txt")),("2","3"):("Scissors Wins!",open("SCISSORS.txt")),
           ("3","3"):("Draw!",open("SCISSORS DRAW.txt")),("3","2"):("Scissors Wins!",open("SCISSORS.txt")),("3","1"):("Rock Wins!",open("ROCK.txt"))}
    computer = str(random.randint(1,3))
    user = input("Menu:\n1) Rock\n2) Paper\n3) Scissors\n>>> ")
    while not user in ["1","2","3"]: user = input("Incorect Input!\n>>> ")

    printRPS = {"1":"Rock","2":"Paper","3":"Scissors"}
    print("\n"*40)

    print("User:",printRPS[user],"\nComputer:",printRPS[computer])
    print(RPS[(user, computer)][1].read(), "\n"+RPS[(user, computer)][0]),input()
