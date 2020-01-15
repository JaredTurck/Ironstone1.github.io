File = ["1.txt"]
user = str(print("How many questions would you like to answer?"))
while user.isdigit()==False:
    user = input(">>> ")
    if user.isdigit()==True and int(user) > len(File):
        user = str(print("the number you have ented is to large!"))
for i in range(0,int(user)):
    question = open(File[i],"r").readlines()
    print(*question,sep="")
    userAnswer = input("> ")
