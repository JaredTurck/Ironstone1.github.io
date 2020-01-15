import hashlib, getpass, os, subprocess
start = input(open("message.txt","r").read())
menu = input("""Main Menu:\nChoose option from the Menu bellow:
1) Change User Account Password\n2) EXIT program!\n>>> """)
while not menu in ["1","2"]:
    menu = input("Inccorect Input!\n>>> ")
if menu == "1":
    valid = print("Please Enter the new password for your user account:")
    while valid == None:
        user = getpass.getuser()
        newpass = getpass.getpass("Password: ")
        passConform = getpass.getpass("Password Confirmation: ")        
        if newpass != passConform:
            valid = print("Your password(s) do not match!")
        elif (any(filter(str.isupper, newpass)) != True or any(filter(str.islower,
        newpass)) != True or not len(newpass) >= 8):
            valid = print("Your Password(s) does not meet minimum requirments!")
        else:
            valid = True
    print("\nAre you sure you want to change your password, for user '"+user+"':")
    option = input("Type 'Y' to proceed, or 'N' to EXIT. [Y/N]: ")
    while not option.upper() in ["Y","N"]:
        option = input("Not a valid option!\n>>> ")
    if option.upper() == "Y":
        print("\n\nuser account:",user),print(os.system("net user "+user))
        File = open("commond.bat","w")
        File.write("net user "+user+" "+newpass), File.close()
        system = subprocess.Popen("start %CD%\commond.bat.lnk", shell=True)
        input("Press enter to continue... after you have run the cmd file!")
        File = open("commond.bat","w").write("echo This File must be closed!")
        print("Your User accounts password, has been Successfully changed!")
        os.system("rundll32.exe user32.dll, LockWorkStation")
    elif option.upper() == "N":
        pass
elif menu == "2":
    pass
newpass = hashlib.sha512(newpass.encode("ascii")).hexdigest()
passConform = hashlib.sha512(passConform.encode("ascii")).hexdigest()
input("Press enter to close the Program..."), exit()
