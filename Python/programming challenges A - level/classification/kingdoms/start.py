def question(Q):
    user = input(Q)

    while user.upper() not in ["Y","YES","N","NO"]:
        user = input("\nNot a valid input!\n"+Q)
    return user.upper()

input("""\nThink of an organism:\nthis can be a plant, animal,\n
or even monera, fungi or protista\npress enter to continue, when your ready...""")
print("\n")

for kingdom in ["animal","fungi","monera","plant","protista"]:
    Q = "Does your organism belong to the %s kingdom? " % (kingdom)
    user = question(Q)
    

    if user.upper() in ["Y","YES"]:
        break

if kingdom == "animal":
    from animal import animal
elif kingdom == "fungi":
    from fungi import fungi
elif kingdom == "monera":
    from monera import monera
elif kingdom == "plants":
    from plant import plants
elif kingdom == "protista":
    from protista import protista
