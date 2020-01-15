from random import randint
grid = [["~","~","~","~","~"],  # creates the grid
        ["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"]]
def printGrid(table):           # Prints the grid
    for row in table:
        for item in row:
            print(item, end=" ")
        print("\n")
printGrid(grid)
mines = []
mineNumber = 0
while mineNumber < 3:
    X = randint(1,5)
    Y = randint(1,5)
    position = [Y,X]
    if position not in mines:
        mines.append(position)
        mineNumber = mineNumber + 1
print(mines)
coordinates = True
while coordinates == True:
    try:
        X = int(input("Enter a X coordinate: "))
        Y = int(input("Enter a Y coordinate: "))
        if X in range(1,6) and Y in range(1,6):
            coordinates = False
        else:
            print("Coordinates are not valid")
    except:
        print("That is not a valid coordinate")
if X in mines and Y in mines:
    grid.append[X][Y] = "M"
    print("You found a mine")
    minefound = minefound + 1
else:
    grid[X-1][Y-1] = "X"
printGrid(grid)
