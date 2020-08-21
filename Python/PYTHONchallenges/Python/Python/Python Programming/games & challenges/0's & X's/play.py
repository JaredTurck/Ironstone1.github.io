'''"║","═","╝","╚","╗","╔"'''
import random
grid = """
╔═══════════╗
║ %s ║ %s ║ %s ║
║═══║═══║═══║
║ %s ║ %s ║ %s ║
║═══║═══║═══║
║ %s ║ %s ║ %s ║
╚═══════════╝
"""
wins = {0:[1,2,3],1:[4,5,6],2:[7,8,9],3:[1,4,7],4:[2,5,8],5:[3,6,9],6:[1,5,9],7:[3,5,7]}
game = [" " for i in range(9)]

while " " in game:
    computer = random.randint(1,9)
    while game[computer-1] != " ":
        computer = random.randint(1,9)
    game[computer-1] = "O"
    print("Grid:\n",grid % tuple(game))

    if " " not in game:
        print("Game over!")
        break
    else:
        for i in wins:
            if [game[wins[i][x]] == "X" for x in range(3)] == [True]*3:
                print("You win!")
            elif [game[wins[i][x]] == "O" for x in range(3)] == [True]*3:
                print("You lose!")
    
    user = str(print("It's your turn!"))
    while user not in range(1,10):
        try:
            user = int(input("Enter position 1-9: "))
            if user not in [i for i in range(1,10)]:
                user = str(print("\nOut of range Input!"))

            elif game[user-1] != " ":
                user = str(print("\nThat position has already been played!"))
        except:
            print("\nNot a valid Input!")
    game[user-1] = "X"
