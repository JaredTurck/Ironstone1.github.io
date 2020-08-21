import random
guess = input("Guess a number: ")
number = int (random.randint(1,50))
while guess != number:
    if guess < number:
        print("Higher")
    elif guess > number:
        print("Lower")
    else:
        print("that wrong, try again ")
    guess = input("quess a number ")
print("\nWell done, thats right")

input("\n press ENTER to exit program")
