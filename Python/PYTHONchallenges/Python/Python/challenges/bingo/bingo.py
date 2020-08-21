grid = []
bingo = ["B","I","N","G","O"]
for i in range(0,5):
    grid.append([])
    for ii in range(0,5):
        grid[i].append("__")
def printGrid():
    print("<<<",bingo[0],bingo[1],bingo[2],bingo[3],bingo[4],">>>",sep=" "*10)
    for i in range(0,len(grid)):
        print(i+1," "*5,end="")
        for ii in range(0,len(grid[i])):
            print(" "*3,bingo[ii]+str(i+1),grid[i][ii]," ",end="")
        print("\n")
print("BINGO GRID:"),printGrid(), print("You can Enter any number from 1 to 100")
userList = []
for X in range(0,len(grid)):
    for XX in range(0,len(grid[X])):
        print("Enter a number for",bingo[XX]+str(X+1))
        user = "Invalid!"
        while user.isdigit()==False:
            user = input(">>> ")
            try:
                if not int(user) in range(1,101):
                     user = "Invalid!"
                     print("your Input is out of Range!")
                while user in userList:
                    user = "Invalid!"
                    print("You have allready input this number!")
            except:
                print("incorrect input!")
        grid[X][XX] = user
        userList.append(user)
printGrid(), input("Are you read to play? Press Enter when Ready...")
import random, time
counter = 0
numberList = []
while True:
    number = random.randint(1,100)
    while number in numberList:
        number = random.randint(1,100)
    numberList.append(number)
    counter = counter + 1
    print("Round ",counter,":",sep=""),print("generated number:",number)
    found = None
    A = "~"
    for i in range(0,5):
        if str(number) in grid[i]:
            grid[i][grid[i].index(str(number))] = A
            found = True
        for Y in range(0,5):
            if (grid[Y][0] == A and grid[Y][1] == A and grid[Y][2] == A
            and grid[Y][3] == A and grid[Y][4] == A or grid[0][0] == A
            and grid[1][1] == A and grid[2][2] == A and grid[3][3] == A
            and grid[4][4] == A or grid[0][4] == A and grid[1][3] == A
            and grid[2][2] == A and grid[3][1] == A and grid[4][0] == A
            or grid[0][Y] == A and grid[1][Y] == A and grid[2][Y] == A
            and grid[3][Y] == A and grid[4][Y] == A):
                print(open("bingo.txt","r").read()), printGrid()
    if found == True:
        printGrid(), print("your grid DOES contains the number",number)
    else:
        printGrid(), print("Your grid does NOT contain the number",number)
    print("Please Wait as the Numbers are called out!",counter+1)
    time.sleep(0.5)
