import random
Difficulty = input("Choose your difficulty:\n1) Easy\n2) Normal\n3) Hard\n> ")
while Difficulty not in ["1","2","3"]:
    Difficulty = input("Please Enter a valid Difficulty: ")
if Difficulty == "1":
    length = 15
elif Difficulty == "2":
    length = 10
elif Difficulty == "3":
    length = 5
    
color = ["RED","BLUE","GREEN","YELLOW","WHITE","~~~~~"]
code, user, guess = [], [], str("Nothing")
for i in range(0,5):
    code.append(random.randint(1,5))
for setup in range(0,length):
    user.append([5,5,5,5,5])
def printGrid():
        for i in range(0,length):
            print("="*50,"\nGuess",i+1,"|",color[user[i][0]],"|",color[user[i][1]],
            "|",color[user[i][2]],"|",color[user[i][3]],"|",color[user[i][4]],"|")
        print("="*50)
def end(time):
    print(open("end.txt","r").read(),"Welldone you have Successfully",
          "cracked the code. it took you",Game,"Guesses")
    print(input("Press enter to EXIT the program..."),exit())
for Game in range(0,length):
    valid = False
    while valid == False:
        Output = (print("\n"*40,open("logo.txt").read()),print("PLAYERS GRID:"),
            printGrid(),print(open("user.txt","r").read(),"Previous Guess:",guess))
        guess = input(" Enter your guess: ")
        counter = 0
        if guess.isdigit()==True and len(guess) == 5:
            for X in range(0,5):
                if guess[X] in ["1","2","3","4","5"]:
                    counter = counter + 1
            if counter == 5:
                valid = True
    for Y in range(0,5):
        user[Game][Y] = int(guess[Y])-1
    if user[Game] == code:
        end(i)
    for I in range(0,5):
        if user[Game][I] in code:
            if user[Game][I] == code[I]:
                print("* BLACK!")
            else:
                print("* WHITE!")
    input("Press enter to continue...")
print(open("GameOver.txt","r").read(),"GAME OVER!\nThe correct code was",*code)
