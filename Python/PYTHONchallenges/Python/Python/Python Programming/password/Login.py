import getpass, bcrypt
valid = print("Enter your Username and Password bellow:")
while valid != True:
    user, password = input("username: "), getpass.getpass()
    
    Data = open("Data.csv","r").readlines()
    Data = ([Data[i].split(",") for i in range(len(Data))])
    if True in [True if user == Data[i][0] else False for i in range(len(Data))]:
        salt = [bytes(Data[i][1].rstrip("\n").encode("utf-8")) for i in range(len(Data))]
        for I in range(len(salt)):
            if bcrypt.hashpw(password.encode("utf-8"),salt[I]) == salt[I]:
                valid = True
        if valid != True:
                print("Your user name and password do not go together!")
    else:
        print("An error occured, when trying to log you in.\n"
        +"make sure you have enterd your user name and password correctly\n")
