import random
(number, user, guess) = (random.randint(1,100), "-0", 0)
print("Guess the random number from 1 to 100:")
while int(user) != number:
    user = input(">>> ")
    while user.isdigit()!=True:
        user = input("Not a valid Guess!\n>>> ")
    [print("Guess Higher!") if int(user) < number else print("Guess Lower!")]
    guess += 1
else:
    print("Welldone you guess correct, the random number was %d!" % (number), \
          "\nYou took %d Guesses (out of a possible 100)" % (guess))
