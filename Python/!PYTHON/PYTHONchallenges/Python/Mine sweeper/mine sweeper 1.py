from random import randint
grid = [["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"]]
def printGrid(table):
    for row in table:
        for item in row:
            print("",item, end=" ")
        print("\n")
count,minefound,game = 0, 0, True
printGrid(grid)
mines = []
guesses = []
mineNumber = 0
game = True
while game == True:
    while mineNumber < 3:
        X = randint(0,4)
        Y = randint(0,4)
        position = [Y,X]
        if position != mines:
            mines.append(position)
            mineNumber = mineNumber + 1
    coordinates = True
    while coordinates == True:
        try:
            X = int(input("Enter a X coordinate: "))
            Y = int(input("Enter a Y coordinate: "))
            position=[Y-1,X-1]
            if position in guesses:
                print("you have already enter this corrdinate")
            elif X in range(1,6) and Y in range(1,6):
                coordinates = False
            else:
                print("Coordinates are not valid")
        except:
            print("That is not a valid coordinate")
    else:
        guesses.append(position)
    if position in mines:
        print("You found a mine")
        minefound = minefound + 1
        count = count + 1
        grid[Y-1][X-1] = "M"
    else:
        print("you did not find a mine!")
        count = count + 1
        grid[Y-1][X-1] = "X"
    if minefound == 3:
        game = False
    printGrid(grid)
print("You took",count,"guesses")
input(), exit()
