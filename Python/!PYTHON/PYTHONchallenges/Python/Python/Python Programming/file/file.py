print(open("file.txt").read()) # reads file & returns string

print(open("file.txt").readlines()) # reads file & retuns list

file = open("file.txt") # reads file & returns line in file
for i in range(3):
    print(file.readline(),end="")
    
