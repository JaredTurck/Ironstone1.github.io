valid = True
while valid == True:
    iterations = int(input("Enter number of iterations:\n>>> "))
    if int(iterations) == int:
        valid = False
    else:
        print("\nincorrect input!")

fibonacci = [0,1]
previousValues = [0,1]
for i in range(1,iterations):
    previousValues = previousValues[1],sum(previousValues)
    fibonacci.append(previousValues[1])
print("Fibonacci sequence: ",*fibonacci,sep=" ")
