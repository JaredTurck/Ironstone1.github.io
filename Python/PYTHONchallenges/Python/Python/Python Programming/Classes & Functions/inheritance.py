class organisims():
    class Animal():
        def __init__(self, animal):
            self.animal = animal

        def member(self):
            print("All members of this class are animals!")
    class Plants():
        def __init__(self, plant):
            self.plant = plant

        def member(self):
            print("All members of this class are plants")

class Cat(organisims.Animal):
    def cat(self):
        print("A cat is an Animal so inherits the Animals class,")
        print(self.animal,"is part of this class!")

class hippo(organisims.Animal):
    def hippo(self):
        print("All members of this class are hippos!")

class Oak(organisims.Plants):
    def oak(self):
        print("All members of this class are Oak's!")
