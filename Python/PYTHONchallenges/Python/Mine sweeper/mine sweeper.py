import random
grid = []
for x in range(0,5):
    grid.append(["~","~","~","~","~"])
def Grid():
    for row in grid:
        print(*row)
mines, guesses = [],0
guessedPositions = []
while len(mines) < 3:
    position = []
    position.append(random.sample(range(0,4),2))
    if not position in mines:
        mines.append(position)
Grid()
mineNumber = 0
while mineNumber < 3:
    coordinates = []
    while coordinates == []:
        coordinates = []
        try:
            coordinates.append(int(input("Enter X Corrdinate: ")))
            coordinates.append(int(input("Enter Y Corrdinate: ")))
            if coordinates in guessedPositions:
                print("You already Guessed this position!")
                coordinates = []
            elif coordinates[0] in range(1,6) and coordinates[1] in range(1,6):
                print("Grid:")
            else:
                print("Only Enter Numbers between 1 and 5!")
        except:
            print("\nNot a valid Corrdinate!")
    guessedPositions.append(coordinates)
    guesses = guesses + 1
    if coordinates in mines:
        print("You Found a Mine!")
        grid[coordinates[1]-1][coordinates[0]-1] = "M"
        mineNumber = mineNumber + 1
    else:
        print("you did not find a mine!")
        grid[coordinates[1]-1][coordinates[0]-1] = "X"
    Grid()
