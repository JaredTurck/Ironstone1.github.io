import random
menu = input(open("menu.txt").read())
while menu not in ["1","2","3"]:
    menu = input(open("menu.txt").read())
Chr = ""#uppercase, lowercase, digits
#Chr = "".join([chr(i) for i in range(97,122+1)]) # Lowercase
Chr += "".join([chr(i) for i in range(65,90+1)]) # Upercase
Chr += "".join([str(i) for i in range(10)]) # Digits

length = input("How many Random keys? ")
while length.isdigit()!=True:
    length = input("Not a valid Input!\nHow many Random keys? ")

if menu == "1":
    Format = "%s%s%s%s%s-%s%s%s%s%s-%s%s%s%s%s"
elif menu == "2":
    Format = "%s%s%s%s%s-%s%s%s%s%s-%s%s%s%s%s-%s%s%s%s%s-%s%s%s%s%s"
elif menu == "3":
    exit()

print("\n\tGenerated Key:\n"+"-"*25)
for i in range(1,int(length)+1):
        numbers = random.sample(range(0,len(Chr)-1),len(Format.replace("-",""))//2)
        key = Format % (tuple([Chr[i] for i in numbers]))
        print(str(i)+")","\t"+key)
