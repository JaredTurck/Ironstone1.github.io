def add(num1,num2):
    answer = num1 + num2
    return answer
def Subtract(num1,num2):
    answer = num1 - num2
    return answer
def Divide(num1,num2):
    answer = num1 / num2
    return answer
def Multiply(num1,num2):
    answer = num1 * num2
    return answer

first = int(input("Enter your first number: "))
second = int(input("Enter your second number: "))

print("Choose an option: (1) Add, (2) Subtract, (3) Divide, (4) Multiply")
choice= int(input())

if choice == 1:
    answer = add(first,second)

if choice == 2:
    answer = Subtract(first,second)

if choice == 3:
    answer = Divide(first,second)

if choice == 4:
    answer = Multiply(first,second)


print("The answer is",answer)

input("")

