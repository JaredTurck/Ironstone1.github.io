
def calc():
    print("Calculator:")
    user = input("input: ")
    while set([i in "0123456789.+-*/%() " for i in user]) != {True}:
        user = input("Invalid input!\ninput: ")

    answer = eval(user)
    print(f"answer: {user} = {answer}")
