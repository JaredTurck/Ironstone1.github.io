# Validation Checks User Input!
(Age, Max) = ("","")
while (Age + Max).isdigit() != True:
    Max = input("Enter a Maximum Height: ")
    Age = input("Enter a Maximum Age: ")
    if (Age + Max).isdigit() != True: print("Incorect Input!")

# CSV file is opened, each Horse's Data is split with a comma, then sorted
Horse_Data = sorted([Horse.split(",") for Horse in open("Task 1.csv").readlines()])

# makes all Horse's names the same length
for Horse in Horse_Data:
    while len(Horse[0]) < 20:
        Horse[0] += " "
        
# The Data in range Age & Max, is printed out in a neat Table
print("\nHorse Name:\t\t Horse Age:\t\t Horse Height:")
for Horse in Horse_Data:
    if int(Horse[1]) in range(int(Age)) and int(Horse[2]) in range(int(Max)):
        print(Horse[0],"\t",Horse[1],"\t\t\t",Horse[2],end="")
