valid = True
while valid == True:
    try:
        iterations = int(input("Enter number of iterations: "))
        valid = False
    except:
        print("invalid number of iterations")
fibonacci = [0,1]
previousValues = [0,1]
for i in range(1,iterations+1):
    previousValues = previousValues[1],sum(previousValues)
    fibonacci.append(previousValues[1])
print("Fibonacci sequence: ",*fibonacci,sep=" ")
