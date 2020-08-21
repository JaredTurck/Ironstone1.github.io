import hashlib, bcrypt, sys
HashRef = {"1":"sha1","2":"sha224","3":"sha256","4":"sha384","5":"sha512","6":"md5"}
HashMenu = input(open("menu.txt","r").read())
while not HashMenu in ["1","2","3","4","5","6","7"]:
    HashMenu = input("\n"*10+open("menu.txt","r").read())

ChrRef = {"1":[48,57],"2":[97,122],"3":[65,90],"5":[32,127],"6":[32,255]}
Chr = input(open("encode.txt","r").read())
while not Chr in ["1","2","3","4","5","6"]:
    Chr = input(open("encode.txt","r").read())

char = ""
if Chr == "4":
    char = "".join([chr(i) for i in range(97,122+1)])
    char += "".join([chr(i) for i in range(65, 90+1)])
else:
    char = "".join([chr(i) for i in range(ChrRef[Chr][0], ChrRef[Chr][1]+1)])

length = input("Enter the maximum length, your hashed string could be: ")
while length.isdigit()!=True:
    length = input("Not a valid Input!\n>>> ")

Hash, HashC = (True, False)
while Hash != HashC:
    Hash = input("Enter the Hash you would like to decrypt: ")
    HashC = input("Enter the Hash Again, to Conform: ")
    if Hash != HashC: print("Inccorect Input!")

print("If your Hash conatains a salt enter it now, or press enter to continue...")
Salt = input("Enter Salt: ")
print("\nStarted Brutal Force Attack... Please Wait...\nThis could take a while..")
Text = [""]
while len(Text) <= int(length)+1:
    for i in range(len(char)):
        Text[len(Text)-1] = char[i]
        if HashMenu == "7":
            HashText = bcrypt.hashpw("".join(Text).encode("utf-8"), Salt.encode("utf-8"))
        else:
            HashText = (getattr(hashlib, HashRef[HashMenu])\
                       (("".join(Text) + Salt).encode("utf-8")).hexdigest())

        if HashText == Hash:
            print("\nWe have decoded your Hash!\nHash:",Hash,"\nPlain Text:","".join(Text))
            open("Decipher.txt","a").write("\nHash: "+Hash+"\nText: "+"".join(Text))
            sys.exit()
        
    if Text == list(char[len(char)-1] * len(Text)):
        Text = list(char[0] * (len(Text)+1))
    else:
        if Text[0] == char[len(char)-1] and len(Text) >= 3:
            Text[0] = ""
        Index = Text.index(char[len(char)-1])
        Text[Text.index(char[len(char)-1])-1] = \
        char[char.index(Text[Text.index(char[len(char)-1])-1])+1]
        Text[Index] = char[0]
        if Text[0] == "":
            Text[0] = char[len(char)-1]
