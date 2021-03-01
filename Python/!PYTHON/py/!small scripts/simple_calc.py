-execute
def calc(num1, num2, o):
    if (o == "+"):
        print(num1 + num2)
    elif (o == "-"):
        print(num1 - num2)
    elif (o == "*"):
        print(num1 * num2)
    elif (o == "/"):
        print(num1 / num2)
    else:
        print("Invalid operator!")

calc(12, 67, "+")
