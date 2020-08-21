import random
grid = [list("O"*5) for i in range(5)]
print_grid = [print(*row) for row in grid]
ship = random.sample(range(0,len(grid)),2)
count = 0

found = False
while found == False:
    count += 1
    print("round %d:" % (count))
    valid =  print("Enter Your corrdinates in a list, e.g. [X, Y]")

    while valid != True:
        try:
            coordinates = eval(input(">>> "))
            if type(coordinates) == list and len(coordinates) == 2:
                if coordinates[0] in range(1,6) and coordinates[i] in range(1,6):
                    valid = True
                else:
                    print("Out of range input!")
            else:
                print("Yout input just be in a list format!")
        except:
            print("Not a valid input!")
