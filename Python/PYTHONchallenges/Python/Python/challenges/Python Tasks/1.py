name = input("Enter your name: ")
age = input("Enter your age: ")
while age.isdigit()==False:
    age = input("Not a valid age!\n>>> ")
tv = input("Enter your favourite TV program: ")
print(name,"is",age,"years old and likes",tv)
