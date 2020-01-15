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
