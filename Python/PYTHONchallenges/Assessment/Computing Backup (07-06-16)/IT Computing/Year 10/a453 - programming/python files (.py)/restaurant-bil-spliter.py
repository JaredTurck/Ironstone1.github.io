print ("Welcome to the meal price splitter")
value = input("How many people need to pay? ")
people = int(value)
value = input("How much was the bill? £")
bill = float(value)
priceEach = str(bill/people)
print(("Each person should pay £") + priceEach)

input("")
