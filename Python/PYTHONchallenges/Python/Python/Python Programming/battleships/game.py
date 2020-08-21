import random
grid = [list("~"*10) for i in range(10)] # set up Grid
def printGrid(): [print("\n",(" "*2).join(grid[i])) for i in range(len(grid))]
# The ships:
Aircraft_Carrier = random.sample(range(0,len(grid)-1),2)
#Battleship #4
#submarine #3
#Cruiser #3
#Destroyer #2

# Include:
# multiple battle ships
# diffrent sized ships
# 2 player game
# rematches
