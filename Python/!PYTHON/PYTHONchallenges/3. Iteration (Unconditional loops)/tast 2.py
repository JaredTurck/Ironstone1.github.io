fibonacci = [0,1]
previousValues = [0,1]
for i in range(1,11):
    previousValues = previousValues[1],sum(previousValues)
    fibonacci.append(previousValues[1])
print("Fibonacci sequence: ",*fibonacci,sep=" ")
