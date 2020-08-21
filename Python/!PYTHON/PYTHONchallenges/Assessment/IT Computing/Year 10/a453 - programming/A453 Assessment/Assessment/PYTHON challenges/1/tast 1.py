age = None
while age == None:
    try:
        age = int(input("How old are you? "))
        name = input("What is your name? ")
        tv = input("What is your favourite TV program? ")
    except:
        print("That is not a valid age!")
print(name,"is",age,"years old and likes",tv)
