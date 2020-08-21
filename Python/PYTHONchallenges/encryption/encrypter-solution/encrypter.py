def startScreen():
    print("\n"*25,"_"*80,"\n\n"," "*17,"<-","=*"*21,"->\n"," "*27,"SHA & MDA Encrypter\n"," "*30,"by Jared Turck!\n"," "*17,"<-","=*"*21,"->\n",sep="")
    print("""MMMMMMMMMMMMMmmmmhhmdmdNmmmmmmmmmmmmmNNNNMNNNMMmMMMNNNNmmNNMMNNNNNNMNMMMMMMMMMMM
MMMMMMmmMMMNNNNmdddddmmNNNmmmNNmmmmNmo+-` `.:/oymMMNNNmmyhmmmmmNNNNNNMMMMMMMMMMM
MMMMMMNNMMNNNNNddhymdyshhmmmmmmmmNmo.`` `.`-::///+hmmmmNmmmNNmNmNmNNMMMMMMMMMMMM
MMMMMMMMNNNNNmNmmmmmmmmmmNmNmmmmNd.  `.--//+o++/+//smmNmNmmNNNNmmmNNNMMMMMMMMMMM
MMMMMMMMNNNNNNmmmmmmmmmmNmmNmddmd-` `.:ydNNNNNNdo+yNmmmmNNNNmmNyddmmNNNMMMMMMMMM
NMMMNMNNmmNmNmmmdhhmmhymNNmmmmmNo:.../NNddNNNmmMNNdmNNmdNNNNmmmdddmdNmmMNmMMMMMM
MMMNNNNNNmNNNmmNNddmmysdmmmddmmd//:--mNNNNmNNNNNNmmmmmmddmmmhhdmdhhyddmmNNMMMMMM
MNNNmmNNmmmNNdmNmddmmdydhmmmdNNd++//+MNNNNmmmNNmmdmdhmmmohhd++hyhhdmNNNNNNNMMMMM
NMMNNNNNNNNNNmmNNmmmmdhdhdddhNNd//+/oMMMNNNNNNNNNNmmdmmdyhhoosyyhddmmNNNNNNNMMMM
NMMMMMNNNNNNNNNNNmmNNNNdyyomNmmd////oNMNNNNNNNNNmmmdddddhys+ooyyhddNhdddNMNMMMMM
NMNNNNNNNNNNmhdNNNNNNNNmddhmNmNmoosssNNNNNNNNNNNmdmmmddhdo:-syhhddmNNNNNMNMMMMMM
NMMNNNNNNNNNmyyNNNNNNNNNNNmNNmhmysssyhmmNNNNNNNmdhyhdmhymhyyyyhhddymNNNNMNMMMMMM
NMMNNNNNNNNNmmmddNNNmNNNNNNNmhhhdhyyyyyyysssssyyssoyyysohddddhdhhhsdNNNNNNMMMMMM
NMMNNNNNNNNNNNNmdNNmmmNNNNNh/+o++++///:``     .-`...--..-:hydhodsyhdmdmNNNMMMMMM
NNNNNNNNNNNNNNNNNNNmmNNNNNN+://:::---..``         `-/--//-odhhhhhhdhNNNdNNMMMMMM
NNNNNNMMMNNNNNNNNNNNmNNNNNNo:/::-:-```          ..://::///sdhhhhdmmhmNNmmNNMMMNN
MNNMMMMMMMNmNNNMNNNNNNNNNNNs//+//::-...``.shdy/ -:/+++++//oydhyhNNmmNNNNNMNNNMMm
MMNMMMMMMMNNNMNNNNNNNNNNNNNs////:::..--`-dmNNmmo.:/++ooo/:odddhmmNNNNMMMMMNMMMMM
MMMMMMMMMMMMMMMNNMMNmNNNNmms/::-..-.--..+hmmmdmy`///+os+::oddhddmmNNNNMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNNNNmmmmmo-.   `.`-:--.yNNNNd:-/++os+::/yyhssydddmNNMMMMMMMMMM
MMMMMMMMMMMMMMMMNNmdhhyddmdo:-````-:::-..-yNNm///+++oo+/::shhhhhmmNNNNMMMMMNNMMM
MMMMMMMMMMMMMMMNNNNNNmmmddmo::...--/:///-:smdd++++/++++//:sdddmdNNNMMMMMMNMMMMMM
MMMMMMMMNNMMMNNNNNNNNNmdhmmo:-....`//:.`//smmmoss++/:/+//:shmmmmNMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMNNMMMMNNmmNNo:-..`..://:.:-:syo+yyso::///+/smmNNNMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMNNNNNMMMNNmmmNo::...-/:///---::/+yosys+//////sNNMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMNNMMNNNNNNo:-:-:///://:::::/+os+oo+////::yNMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMNMMMNNNNNo:/::-:/::::::-:::://+o///::::oNMNNMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMNMNNNs/:-:::--:.--:::/++ossyyhdmmNNMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMNhoossssyhddmNNNNNNNNNNNNNmNNNNMNMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMNNMMMMMNMMNNMMMNNNMMNNNMMNNNMMMMMMMMMMMMMMMMMMMMMMMMM""")
startScreen()
print("_"*80),input("[ENTER]"),print("\nChoose Option From The Menu Bellow:","\n1) Hashing","\n99) EXIT program")
def UserInput():
    UserString = input("Enter your String to Encrypt: ")
    return UserString;    
def START():
    import os, hashlib, datetime
    option = None
    while option not in ["1","99"]:
        startScreen()
        print("_"*80),print("\nChoose Option From The Menu Bellow:","\n1) Hashing","\n99) EXIT program")
        def Hashing():
            def HashingSHA1():
                SHA1option = None
                while SHA1option not in ["1","99"]:
                    startScreen()
                    SHA1option = input("Secure Hashing Algorithm 1:\nChoose option from list bellow:\n1) SHA-1\n99) Return to Hash Menu\n>>> ")
                    if SHA1option == "1":
                        print("You have selected SHA1 Algorithm")
                        UserString = UserInput()
                        Hash = hashlib.sha1(UserString.encode("ascii")).hexdigest()
                        File = open("HashFolder\HashText.txt","a")
                        File.write(str(datetime.datetime.now())), File.write("  Secure Hashing Algorithm 1: \n"), File.write(Hash), File.write("\n\n"),File.close()
                        os.system("start HashFolder\HashText.txt")
                        print("\nYour Finished Hash:",Hash),input("\nPress enter to continue..."),input("Conform Enter...")
                        EXITMESSAGE()
                    elif SHA1option == "99":
                        Hashing()
                    else:
                        print("Not valid option!")
            def HashingSHA2():
                SHA2option = None
                while SHA2option not in ["1","2","3","4","99"]:
                    startScreen()
                    SHA2option = input("SHA2 Algorithm:\nChoose option from Menu bellow\n1) SHA-224\n2) SHA-256\n3) SHA-384 \n4) SHA-512 \n99) Return to Hash Menu\n>>> ")
                    if SHA2option in ["1","2","3","4"]:
                        UserString = UserInput()
                    if SHA2option == "1":
                        Hash, SHA2Bit = hashlib.sha224(UserString.encode("ascii")).hexdigest(), (" SHA2-224 ")
                    elif SHA2option == "2":
                        Hash, SHA2Bit = hashlib.sha256(UserString.encode("ascii")).hexdigest(), (" SHA2-256 ")
                    elif SHA2option == "3":
                        Hash, SHA2Bit = hashlib.sha384(UserString.encode("ascii")).hexdigest(), (" SHA2-384 ")
                    elif SHA2option == "4":
                        Hash, SHA2Bit = hashlib.sha512(UserString.encode("ascii")).hexdigest(), (" SHA2-512 ")
                    elif SHA2option == "99":
                        Hashing()
                    else:
                        print("not a valid option")
                    if SHA2option in ["1","2","3","4","99"]:
                        File = open("HashFolder\HashText.txt","a")
                        File.write(str(datetime.datetime.now())), File.write("  Secure Hashing Algorithm 2: "),File.write(SHA2Bit), File.write("\n"), File.write(Hash), File.write("\n\n"),File.close()
                        os.system("start HashFolder\HashText.txt")
                        print("\nYour Finished Hash:",Hash),input("\nPress enter to continue..."),input("Conform Enter...")
                        EXITMESSAGE()
            def HashingMD4():
                MD4option = None
                while MD4option not in ["1","99"]:
                    startScreen()
                    MD4option = input("MD4 Algorithm:\nChoose option from Menu bellow\n1) MD4\n99) Return to Hash Menu\n>>> ")
                    if MD4option in ["1"]:
                        UserString = UserInput()
                    if MD4option == "1":
                        Hash = hashlib.new("md4",UserString.encode("ascii")).hexdigest()
                    elif MD4option == "99":
                        Hashing()
                    if MD4option in ["1","99"]:
                        File = open("HashFolder\HashText.txt","a")
                        File.write(str(datetime.datetime.now())), File.write("  Message Digest Algorithm 4: \n"), File.write(Hash), File.write("\n\n"),File.close()
                        os.system("start HashFolder\HashText.txt")
                        print("\nYour Finished Hash:",Hash),input("\nPress enter to continue..."),input("Conform Enter...")
                        EXITMESSAGE()
            def HashingMD5():
                MD5option = None
                while MD5option not in ["1","99"]:
                    startScreen()
                    MD5option = input("MD5 Algorithm:\nChoose option from Menu bellow\n1) MD5\n99) Return to Hash Menu\n>>> ")
                    if MD5option in ["1"]:
                        UserString = UserInput()
                    if MD5option == "1":
                        Hash = hashlib.new("md5",UserString.encode("ascii")).hexdigest()
                    elif MD5option == "99":
                        Hashing()
                    if MD5option in ["1","99"]:
                        File = open("HashFolder\HashText.txt","a")
                        File.write(str(datetime.datetime.now())), File.write("  Message Digest Algorithm 5: \n"), File.write(Hash), File.write("\n\n"),File.close()
                        os.system("start HashFolder\HashText.txt")
                        print("\nYour Finished Hash:",Hash),input("\nPress enter to continue..."),input("Conform Enter...")
                        EXITMESSAGE()
            HashSeries = None
            while HashSeries not in ["1","2","3","4","99"]:
                startScreen()
                print("Choose your Encryption Algorithm series, from The Menu bellow:","\n1) Secure Hashing Algorithm 1 (SHA1) series","\n2) Secure Hashing Algorithm 2 (SHA2) series","\n3) Message Digest Algorithm 4 (MD4) series","\n4) Message Digest Algorithm 5 (MD5) series","\n99) Return to Main Menu")
                HashSeries = input("Option> ")
                if HashSeries == "1":
                    HashingSHA1()
                elif HashSeries == "2":
                    HashingSHA2()
                elif HashSeries == "3":
                    HashingMD4()
                elif HashSeries == "4":
                    HashingMD5()
                elif HashSeries == "99":
                    START()
                else:
                    print("Not a valid option")
        option = input(">>> ")
        if option == "1":
            Hashing()
        elif option == "99":
            exit("Press enter to Exit")
        else:
            print("Not a valid option")
def EXITMESSAGE():
    EXITMESSAGE = None
    while EXITMESSAGE not in ["1","99"]:
        startScreen()
        EXITMESSAGE = input("choose option from Menu Bellow\n1) Return to Main Menu\n99) EXIT program\n>>> ")
        if EXITMESSAGE == "1":
            START()
        elif EXITMESSAGE == "99":
            input("Press Enter to close The program!..."), exit()
START()
