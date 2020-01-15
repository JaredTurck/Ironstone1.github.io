file = open("0-9.txt","r").readlines()
number = input("Enter a number from 1 to 9: ")
while len(number) >= 2:
    number = input("Inccorect input!\n>>> ")
print(*file[(int(number)*17):(int(number)*17)+17],sep="")
