email = input("Enter your email address: ")
valid = list(open("valid.txt"))
local,validity = str(), None
# ========== LOCAL ==========
if "@" in email:
    local = email[:email.index("@")]
    for I in range(0,len(local)):
        for II in range(0,len(valid)):
            if not local[I] in valid[II]: # if character not in list
                if ("." in local[len(local)-1] or "." in local[0]
                    or ".." in email[:email.index("@")]):
                    validity = False
                elif "." in local:
                    validity = True
            elif validity == False: # not working!
                validity = True
if len(local) >= 254 or validity == None:
    validity = False
# ========== HOST ==========
print(validity)
