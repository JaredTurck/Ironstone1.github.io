def sort():
    file = open("text.txt").readlines()
    print(*file,sep="")
    print("\n"+"="*40+"\n",*sorted(file),sep="")

def number():
    count = 1
    file = open("text.txt").readlines()
    for i in range(len(file)):
        if file[i][0] == "@":
            print(file[i][1:],end="")
        else:
            print(str(count) + ") " + file[i],end="")
            count += 1
