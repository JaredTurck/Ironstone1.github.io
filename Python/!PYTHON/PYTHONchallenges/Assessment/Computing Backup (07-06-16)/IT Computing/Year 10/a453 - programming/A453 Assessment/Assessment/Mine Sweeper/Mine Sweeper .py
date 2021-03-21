game,count,minefound = True,0,0
from random import randint as random
grid = [["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"],
        ["~","~","~","~","~"]]
while game == True:
    def Printgrid(table):
        for row in table:
            for item in row:
                print("",item, end="")
            print()
    mines=[]
    for i in range(3):
        X = random(0,4)
        Y = random(0,4)
        position = [X,Y]
        mines.append(position)
    if position in mines:
        X = random(0,4)
    coordinates = True
    while coordinates == True:
        try:
            X = int(input("Enter a X coordinate ")) - 1
            Y = int(input("Enter a Y coordinate ")) - 1
            if X in range(0,6) and Y in range(0,6):
                coordinates = False
            else:
                print("Coordinates are not valid")
        except:
            print("That is not a valid coordinate!")
        print(mines)
        if X in mines and Y in mines:
            grid[X][Y] = "M"
            print("You have found a mine!")
            minefound = minefound + 1
        else:
            grid[X][Y] = "X"
    Printgrid(grid)
    count = count + 1
    if minefound == 3:
        game = False
