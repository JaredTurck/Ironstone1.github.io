from random import randint
input("""<====================>\nWellcome to mind sweeper
     by Jared Turck\n<====================>\nPress enter to continue...""")
userName,game,count,mineFound,mineloop=input("\nPlease enter a Username: "),False,0,0,True
mines = [[randint(1,5),randint(1,5)],[randint(1,5),randint(1,5)],[randint(1,5),randint(1,5)]]
print("Checking if mines are repeated!...")
while mineloop == True:
    if mines[0][0]==mines[1][0] or mines[0][0]==mines[2][0] or mines[1][0]==mines[2][0]:
        mines = [[randint(1,5),randint(1,5)],[randint(1,5),randint(1,5)],[randint(1,5),randint(1,5)]]
        print("found a repeated mine!")
    else:
        print("Done")
        mineloop = False
grid=[["5","_","_","_","_","_"],
      ["4","_","_","_","_","_"],
      ["3","_","_","_","_","_"],
      ["2","_","_","_","_","_"],
      ["1","_","_","_","_","_"],
      ["0","1","2","3","4","5"]]
while game == False:
    for row in grid:
        for i in row:
            print("",i,"",end="")
        print("\n")
        loop = True
    while loop == True:
        try:
            X = int(input("enter your X coordinate: "))
            user = int(input("enter your Y coordinate: "))+1
            A = [0,1,2,3,4,5,6]
            B = list(reversed(A))
            Y = A[user] = B[user]
            if X in range(1,6) and Y in range(0,6):
                loop = False
            else:
                print("only enter numbers between 1 and 5!\n")
        except:
            print("wrong input, try again!\n")
    grid[Y][X]="X"
    #mines = [[randint(1,5),randint(1,5)],[randint(1,5),randint(1,5)],[randint(1,5),randint(1,5)]]
    if X==mines[0][0]and Y==mines[0][1]or X==mines[1][0]and Y==mines[1][1]or X==mines[2][0]and mines[2][1]:
        mineFound,grid[X][Y]=mineFound + 1,"M"
        input("you have found a mine! ")
    if mineFound == 300:
        game = True
    count = count + 1
print(userName,"it took you",count,"attempts to find",mineFound,"mines")
input("press enter to close the program")
exit()
