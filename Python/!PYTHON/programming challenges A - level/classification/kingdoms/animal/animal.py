def question(Items, Question):
    for i in Items:
        Q =  Question % (i)
        user = input(Q)
        
        while user.upper() not in ["YES","Y","NO","N"]:
            user = input("\nNot a valid Input!\n"+Q)
        if user.upper() in ["YES","Y"]:
            break

    return i

def invertebrate():
    pass

def vertebrate():
    return question(["amphibians","birds","fish","mammals","reptiles"],
             "Does your animal belong to the %s class? ")


i = question(["vertebrate","invertebrate"], "Is your animal a %s? ")
if i == "vertebrate":
    group = vertebrate()
    from vertebrate import vertebrate
    getattr(vertebrate, group)()
    
elif i == "invertebrate":
    invertebrate()
