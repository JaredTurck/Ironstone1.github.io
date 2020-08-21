heroes = ["Batman","Wonder Woman","Superman","Spiderman"]
print("Current pilot: ",heroes[0])
print("the co-pilot: ",heroes[1])
heroes = ["Batman","Wonder Woman","Spiderman"]
print("Superman has to take sometime off: ",heroes)
heroes = ["Batman","Wonder Woman","Rogue","Spiderman"]
print(heroes[2]," has joined")
heroes.append("The flash")
heroes.append("Arow")
print("Members of the Alliance: ",heroes)

user = input("which members of the Alliance would you like to replace: from 0 to 5:")
if user == "0":
    print("you are about to replace ",heroes[0])
if user == "1":
    print("you are about to replace ",heroes[1])
if user == "2":
    print("you are about to replace ",heroes[2])
if user == "3":
    print("you are about to replace ",heroes[3])
if user == "4":
    print("you are about to replace ",heroes[4])
if user == "5":
    print("you are about to replace ",heroes[5])

input("")
