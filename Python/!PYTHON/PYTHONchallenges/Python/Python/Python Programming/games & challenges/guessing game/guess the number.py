import random
number = random.randint(0,100)
count = 0
guess = print("Guess the random number from 1 to 100!")
while guess != str(number):
    guess = input("Guess: ")
    while guess.isdigit()!=True:
        guess = input("Not a valid Input!\nGuess: ")
    count += 1

    if int(guess) < number:
        print("Guess Higher!")
    elif int(guess) > number:
        print("Guess Lower!")

print("Welldone, you took %d guess!" % (count))
