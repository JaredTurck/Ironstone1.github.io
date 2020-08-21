name = input("Enter name: ")
age = input("Enter your age: ")
while age.isdigit()!=True:
          age = input("Inccorect Input!\nEnter your age: ")
tv = input("Enter favourite TV program: ")
print(name,"is",age,"years old and likes",tv)
