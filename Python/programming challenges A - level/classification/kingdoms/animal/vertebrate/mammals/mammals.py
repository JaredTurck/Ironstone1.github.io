def Open(FileName):
    file = open(FileName).readlines()
    return [line.replace("\n","").split(",") for line in file]

def question(members):
    for i in members:
        user = input(i[1]+" [Y/N]: ")
        while user.upper() not in ["Y","YES","N","NO"]:
            user = input("Not a valid input!\n"+i[1]+" [Y/N]: ")

        if user.upper() in ["Y","YES"]:
            return "Your animal is a %s!" % (i[0])
    else:
        return "\nGAME OVER: I giveup, what was your animal?"

class mammals():
    def Monotremata():
        print(question(Open("Monotremata.csv")))

    def Artiodactyla():
        pass

    def Rodentia():
        pass

    def Lagomorpha():
        pass

    def Carnivora():
        pass

    def Primate():
        pass

    def Cetacea():
        pass

    def Proboscidea():
        pass

    def Marsupiala():
        pass

    def Perissodactyla():
        pass

    def Xenarthra():
        pass

    def Chiroptera():
        pass

    def Insectivora():
        pass

    def Sirenia():
        pass

for i in ["Monotremata","Artiodactyla","Rodentia","Lagomorpha","Carnivora",
          "Primate","Cetacea","Proboscidea","Marsupiala","Perissodactyla",
          "Xenarthra","Chiroptera","Insectivora","Sirenia"]:

    user = input("Is your animal a %s? " % (i))
    while user.upper() not in ["Y","N","YES","NO"]:
        user = input("\nNot a valid Input!\nIs your animal a %s? " % (i))

    if user.upper() in ["YES","Y"]:
        break
getattr(mammals,i)()
