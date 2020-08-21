animals=["Pig", "Cow", "Sheep", "Horse", "Chicken", "Goat", "Goose", "Duck",
         "Dog", "Cat"]
myAnimal = input("Name a Animal on a Farm: ")
myAnimal = myAnimal.title()
while myAnimal not in animals:
    try:
        print("A",myAnimal,"is Not found on a farm")
        myAnimal = input("Name a Animal on a Farm: ")
        myAnimal = myAnimal.title()
    except:
        print("A",myAnimal,"is a animal found on a farm")
print("A",myAnimal,"is found on a farm welldone!")
