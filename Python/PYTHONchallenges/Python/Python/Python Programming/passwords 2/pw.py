import hashlib, getpass
pw, pwConform = "pw", "pwConform"
while pw != pwConform:
    pw = getpass.getpass("Enter in your Password: ")
    pwConform = getpass.getpass("Conform your password: ")
    if pw != pwConform:
        print("Your password do not match")
password = hashlib.sha512(pw.encode("utf-8")).hexdigest()
password = password[:12]
PasswordList = []
for i in range(len(password)):
    if password[i].isalpha()==True:
        if i % 2 == 0:
            PasswordList.append(password[i].upper())
        else:
            PasswordList.append(password[i])
    else:
        PasswordList.append(password[i])
PasswordList.append("_")
print("New Password: ",*PasswordList,sep=""),input()
