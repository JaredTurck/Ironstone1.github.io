import hashlib, sys
algorithms = {"1":"sha1","2":"sha224","3":"sha256","4":"sha384",
              "5":"sha512"}
characters = open("characters.txt").readlines()

menu = input(open("menu.txt").read()) # User chooses an algorithm from Menu
while menu not in algorithms: # While loop validats input
    menu = input("\n"*10+open("menu.txt").read())

Include = input(open("include.txt").read()) #User chooces the range of characters.
while Include not in ["1","2","3","4","5","6"]:
    Include = input("\n"*10+open("include.txt").read())
if Include == "6":
    characters = str()
    for i in range(32,255+1):
        characters += chr(i)
else:
    characters = characters[int(Include)-1].rstrip("\n")
    
length = input(open("length.txt").read()) # User enters the Max length
while length.isdigit()!=True:
    length= input("Not a valid Length!\n>>> ")

Hash, Conform = "Hash", "Conform" # User enters the Hash to decrypt
while Hash != Conform:
    Hash = input("Please now enter in your Hash\nHash> ")
    Conform = input("Conform by entering the Hash again\nHash> ")
    if Hash != Conform:
        print("\nYour Hashes do not match!")

Salt = input("Is there a salt to go with your Hahs? 'Y/N'\n>>> ")
while Salt.upper() not in ["Y","N"]: # User is asked if there is a salt
    Salt = input("Not a valid input! Salt Yes or No\n>>> ")
if Salt.upper() == "Y": # If chooce = 'Yes', user is asked to enter salt
    Salt = input("Enter the salt value\n>>> ")
else:
    Salt = ""

Text = ""
while len(Text) <= int(length)+1:
    for i in range(len(characters)):
        print(Text+characters[i])
        genHash = getattr(hashlib,algorithms[menu]) \
        ((Text + characters[i] + Salt).encode("utf-8")).hexdigest() # Generates Hash
        if genHash == Hash: # Checks if Hash was found
            print("We have Deciphered your Hash!\nHash: "+Hash+"\nPlain Text: "+Text+characters[i])
            sys.exit()

    if Text == len(Text) * characters[len(characters)-1]: # If all characters are the same
        Text = characters[0] * (len(Text)+1)

    Text += characters[i]
    Text = list(Text)
    Text_Index = Text.index(characters[len(characters)-1])-1
    Text[Text.index(characters[len(characters)-1])-2] = characters[characters.index(Text[Text_Index])+1]
    Text = "".join(Text)
