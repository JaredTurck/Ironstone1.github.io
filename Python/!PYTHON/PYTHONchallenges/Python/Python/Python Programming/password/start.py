import os
while True:
    menu = input(open("start.txt").read())
    while menu not in ["1","2","3"]:
        menu = input(open("start.txt").read())
        
    if menu == "1":
        os.system("python SignUp.py")
    elif menu == "2":
        os.system("python Login2.py")
    elif menu == "3":
        exit()
    input("Press enter to continue to Main Menu..."),print("\n"*10)
