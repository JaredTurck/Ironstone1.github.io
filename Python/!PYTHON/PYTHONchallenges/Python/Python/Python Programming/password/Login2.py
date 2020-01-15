import getpass, bcrypt, time
File = [(line.rstrip("\n")).split(",")for line in open("Data.csv","r").readlines()]
found, attempts, Time = False, 5, 10
while found == False:
    username = input("Enter your Username: ")
    password = (getpass.getpass("Enter your Password: ")).encode("utf-8")
    
    for i in range(len(File)):
        HashPassword = bcrypt.hashpw(password, File[i][2].encode("utf-8"))
        if HashPassword == File[i][1].encode("utf-8"):
            if HashPassword.decode("utf-8") in File[i] and username in File[i]:
                found = True
    if found != True:
        print("The username and/or password is incorrect!\n")
    attempts -= 1
    if attempts <= 0:
        attempts, Time = 5, Time*2
        print("You have have reached your maximum tries, now wait",Time,"seconds!")
        time.sleep(Time)
    elif found == True:
        pass
    else:
        print("You have",attempts,"tries left be for a",round((Time*2)/60,2),"minute time penalty")
print("Access granted!")
