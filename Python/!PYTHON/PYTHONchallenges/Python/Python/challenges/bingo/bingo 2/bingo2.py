import random, time
grid = []
computerGrid, computerNumber = [], []
for i in range(0,5):
    grid.append(["__","__","__","__","__"])
    computerGrid.append(["__","__","__","__","__"])
    for ii in range(0,5):
        number = random.randint(1,100)
        while number in computerNumber:
            number = random.randint(1,100)
        computerGrid[i][ii] = number
        computerNumber.append(number)
bingo = ["B","I","N","G","O"]
print("\n"*40,open("logo.txt","r").read())
def outputGrid(person):
    print(" ",*bingo,sep=" "*12)
    for i in range(0,5):
        print(str(i+1)," "*8,end="")
        for ii in range(0,5):
            print(bingo[ii]+str(i+1),person[i][ii],end=" "*8)
        print("\n")
userNumber = []
print(outputGrid(grid),"Enter numbers from 1 to 100, to add to your Bingo grid!")
for i in range(0,5):
    for ii in range(0,5):
        user = print("Enter a number for",bingo[ii]+str(i+1))
        while user == None:
            try:
                user = int(input(">>> "))
                if not 1 <= user <= 100:
                    user = print("Your input is out of range!")
                if user in userNumber:
                    user = print("You have allready enterd this number!")
            except:
                user = print("Inccorect Input!")
        userNumber.append(user)
        grid[i][ii] = user
print("Bellow is your grid!"),outputGrid(grid),print("Bellow is Computer's Grid!")
outputGrid(computerGrid),input(open("game.txt","r").read())
Found = "#"
a, count,RandomNumberList = 0, 0, []
for Y in range(40):
    print("\n"*20)
while True:
    count = count + 1
    numbers = random.randint(1,100)
    while numbers in RandomNumberList:
        numbers = random.randint(1,100)
    RandomNumberList.append(number)
    def Game(Grid,number,counter):
        counter = counter + 1
        Hit = None
        for i in range(0,5):
            if number in Grid[i]:
                Grid[i][Grid[i].index(number)] = Found
                Hit = True
            if (all(numberI == Found for numberI in grid[i])
            or Grid[i][0]==Found and Grid[i][1]==Found and Grid[i][2]==Found
            and Grid[i][3]==Found and Grid[i][4]==Found):
                if counter % 2==0:
                    print(open("computer.txt","r").read()), exit()
                else:
                    print(open("user.txt","r").read()), exit()
        if Hit == True:
            print("The number",number,"is in your grid!")
        else:
            print("The number called out is NOT in your grid!",number)
        return counter
    print("\n"*40,open("logo.txt","r").read(),"\nROUND",count)
    print("YOUR GRID:")
    a = Game(computerGrid,numbers,a)
    outputGrid(computerGrid)
    
    print("COMPUTER'S GRID:")
    a = Game(grid,numbers,a)
    outputGrid(grid)
    pause = open("pause.txt","r").read()
    while not len(pause) >= 1:
        pause = open("pause.txt","r").read()
    time.sleep(0.4)
