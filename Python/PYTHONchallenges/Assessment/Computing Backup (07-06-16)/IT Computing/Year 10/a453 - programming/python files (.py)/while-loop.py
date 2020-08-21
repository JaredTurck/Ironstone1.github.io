answer = "8"
guess = input("Guess a number: ")

while guess != answer:
    if guess < answer:
        print("Higher")
    elif guess > answer:
        print("Lower")
    else:
        print("that wrong, try again ")
    guess = input("quess a number ")
print("\nWell done, thats right")

input("\n press ENTER to exit program")
