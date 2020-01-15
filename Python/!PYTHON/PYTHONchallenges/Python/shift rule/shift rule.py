menu = input("choose option from enu bellow:\n1) encrypt message \n2) decrypt message \n>>> ")
file = list(open("alpha.txt","r").read())
while menu not in ["1","2"]:
    menu = input("not valid option! choose option from menu above:\n>>> ")
if menu == "1":
    algorithm = +5
elif menu == "2":
    algorithm = -5

user = list(input("Enter your message: "))
for i in range(0,len(user)):
    user[i] = file[file.index(user[i]) + algorithm]
print(*user,sep="")
