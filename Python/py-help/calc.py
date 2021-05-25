num1 = float(input("Enter a number: "))
op = input("Enter an operator: ")
num2 = float(input("Enter a second number: "))

def calc():
    if op is "-":
        return num1 - num2
    elif op is "+":
        return num1 + num2
    elif op is "/":
        return num1 / num2
    elif op is "*":
        return num1 * num2
    else:
        print("Invalid Input!")

print(calc())
