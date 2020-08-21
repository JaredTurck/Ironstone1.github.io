while True:
    print("\n"*40,open("start.txt","r").read())
    email = input("Enter your Email\n>>> ")
    valid = None
    def abc(length,email,File):
        if len(email) <= length:
            validList = list()
            for i in range(0,len(email)):
                if email[i] in (open(str(File),"r").read()):
                    validList.append(email[i])
            return validList
    if "@" in email and "." in email:
        if (".." in email or "." in email[len(email)-1]
        or "." in email[0]):
            valid = False
        else:
            a,b,c = 64,email[:email.index("@")],"!Local_abc.txt"
            Local = abc(a,b,c)
            a,b,c = 255,email[email.index("@")+1:],"!Domain_abc.txt"
            Domain = abc(a,b,c)
            if (len(Local) == len(email[:email.index("@")])
            and len(Domain) == len(email[email.index("@")+1:])):
                valid = True
            else:
                print("The Email address you have enterd is INVALID,",
                      "\nDid you mean: ",*Local+Domain,sep="")
    if valid == None:
        print("INVALID Email address!")
    elif valid == True:
        a,b,c = 64,email[:email.index("@")],"!ESP_abc.txt"
        SMTP = abc(a,b,c)
        if len(SMTP) == len(email[:email.index("@")]):
            print(open("valid_message.txt","r").read())
        else:
            print(open("invalid_message.txt","r").read())
            print("Did you mean: ",*SMTP+Domain,sep="")
    exitP = input("Type 'EXIT' to close program,\nor press enter to continue\n>>> ")
    if exitP.upper() == "EXIT":
        input(exit("Thank You for using this email validator! Press [ENTER]"))
