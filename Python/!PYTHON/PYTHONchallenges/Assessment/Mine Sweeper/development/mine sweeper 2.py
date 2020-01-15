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
    print(position)
