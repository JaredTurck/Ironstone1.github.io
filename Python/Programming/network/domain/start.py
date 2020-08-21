import os

print(os.popen("ver").read()[1:],end="")
print("Copyright (c) 2009 Microsoft Corporation. All rights reserved.\n")

while True:
    user = input(">>> ")
    if user == "exit":
        break
    if "whois" in user:
        n = os.popen("WhoIs\\whois.exe" + user.replace("whois",""))
        print(n.read(),end="")
    
    output = os.popen(user).read()
    print(output)
