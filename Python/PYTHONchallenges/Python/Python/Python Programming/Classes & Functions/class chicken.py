import random, time

class chicken:
    def __init__(self, species, name, colour, gender):
        self.species = species
        self.name = name
        self.colour = colour
        self.gender = gender

    def feed(self):
        feed = input("Would you like to feed "+self.name+"? Y/N\n>>> ")
        while feed.upper() not in ["Y","N","YES","NO"]:
            feed = input("Not a valid Input!\n>>> ")

        if feed.upper() in ["YES","Y"]:
            print(self.name,"Was Sucsessfuly fed!")
        else:
            print(self.name,"Was not fed!")

    def sleep(self):
        sleep = random.randint(0,1)
        if sleep == 1:
            print(self.name,"the",self.species,"does not want to sleep!")
        else:
            sec = random.randint(0,20)
            print(self.name,"will now sleep for",sec,"seconds!")
            time.sleep(sec)

    def hunt(self):
        bodyPart = {1:"Brains",2:"Guts",3:"Livers",4:"Arms & Legs",5:"flesh",6:"intestines"}
        verb = {1:"spilt",2:"bloodied",3:"shreded",4:"splashed",5:"ripped up",6:"Blasted"}
        animal = {1:"fluffy Duck",2:"cute Horse",3:"Rabbit",4:"cow",5:"cuddly cat",6:"eagle"}
        r = random.sample(range(1,6),3)
        print("The",animal[r[0]]+"'s",bodyPart[r[1]],"has been",verb[r[2]],"all over the floor.")

tango = chicken("bantum","Tango","Ginger & white","Male")
