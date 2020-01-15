name = input("Enter name: ")
age = input("Enter age: ")
while age.isdigit()!=True:
    age = input("Not a valid Input!\nEnter age: ")
tv = input("Enter favourite TV program: ")
print("%s is %s years old and likes %s" % (name, age, tv))
