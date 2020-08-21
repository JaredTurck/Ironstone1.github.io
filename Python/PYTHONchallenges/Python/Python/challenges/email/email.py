email = input("Enter your email address: ")
validFile = list(open("valid.txt","r").read())
validList, local  = [], str()
# ==================== LOCAL ====================
if "@" in email:
    local = email[:email.index("@")]
    if local == "":
        valid = False
    else:
        for i in range(0,len(local)):
            if local[i] in validFile:
                validList.append(local[i])
        if len(local) == len(validList):
            if ("." in local[len(local)-1] or "." in local[0]
                or ".." in email[:email.index("@")]):
                valid = False
            else:
                if len(local) >= 64:
                    valid = False
                else:
                    valid = True
        else:
            valid = False
else:
    valid = False
# ==================== DOMAIN ====================
DomainFile = open("domainfile.txt","r").read()
domainList = []
if valid == True:
    domain = email[email.index("@")+1:]
    if domain == "":
        valid = False
    else:
        for i in range(0,len(domain)):
            if domain[i] in DomainFile:
                domainList.append(domain[i])
            if len(domain) == len(domainList):
                if len(domain) >= 255:
                    valid = False
                else:
                    valid = True
            else:
                valid = False
print(valid)
