import hashlib
start = (open("start.txt","r").read())
print("\n"*20),print(start), input("[ENTER]")
def Menu():
    MainMenu = None
    while MainMenu not in ["1","99"]:
        print("\n"*20),print(start)
        MainMenu = input("""Choose Option From The Menu Bellow:\n1) Hashing 
99) EXIT program\n>>> """)
    return MainMenu
def Input(a):
    option = None
    while option not in ["1","99"]:
        print("\n"*20),print(start)
        option = input(a)
    if option == "99":
        pass
    if option == "1":
        user = input("Enter your string to Encrypt: ")
    try:
        return user
    except:
        pass
def MainCodeBlock(MainMenu):
    try:
        Options = MenuText = user = None
        if MainMenu == "1":
            HashMenu = None
            while HashMenu not in ["1","2","3","4","99"]:
                print("\n"*20),print(start)
                HashMenu = input(open("HashMenu.txt","r").read())
            if HashMenu == "1": # SHA1
                MenuText = ("Secure Hashing Algorithm 1:\nChoose option from list bellow:\n1) SHA-1\n99) Return to Main Menu\n>>> ")
                user = Input(MenuText)
                Hash = hashlib.sha1(user.encode("ascii")).hexdigest()
                print(open("Algorithms\SHA1.txt","r").read())
            elif HashMenu == "2": # SHA2
                while Options not in ["1","2","3","4","5","99"]:
                    print("\n"*20),print(start)
                    Options = input("SHA2 Algorithm:\nChoose option from Menu bellow\n1) SHA-224\n2) SHA-256\n3) SHA-384 \n4) SHA-512 \n99) Return to Main Menu\n>>> ") 
                user = input("Enter your string to Encrypt: ")
                if Options == "1":
                    Hash = hashlib.sha224(user.encode("ascii")).hexdigest()
                elif Options == "2":
                    Hash = hashlib.sha256(user.encode("ascii")).hexdigest()
                elif Options == "3":
                    Hash = hashlib.sha384(user.encode("ascii")).hexdigest()
                elif Options == "4":
                    Hash = hashlib.sha384(user.encode("ascii")).hexdigest()
                elif Options == "99":
                    pass
                print(open("Algorithms\SHA2.txt","r").read())
            elif HashMenu == "3": # MD4
                MenuText = ("MD4 Algorithm:\nChoose option from Menu bellow\n1) MD4\n99) Return to Main Menu\n>>> ")
                user = Input(MenuText)
                Hash = hashlib.new("md4",user.encode("ascii")).hexdigest()
                print(open("Algorithms\MD4.txt","r").read())
            elif HashMenu == "4": # MD5
                MenuText = ("MD5 Algorithm:\nChoose option from Menu bellow\n1) MD5\n99) Return to Main Menu\n>>> ")
                user = Input(MenuText)
                Hash = hashlib.new("md5",user.encode("ascii")).hexdigest()
                print(open("Algorithms\MD5.txt","r").read())
            elif HashMenu == "99":
                pass
        elif MainMenu == "99":
            print(open("end.txt","r").read()),input("Thank you for using the encrypter!\nPress enter to EXIT..."),exit()
        print("\nYour Finished Hash:",Hash),input("\npress enter to continue...")
    except:
        pass
while True:
    Main_Menu = Menu()
    MainCodeBlock(Main_Menu)
