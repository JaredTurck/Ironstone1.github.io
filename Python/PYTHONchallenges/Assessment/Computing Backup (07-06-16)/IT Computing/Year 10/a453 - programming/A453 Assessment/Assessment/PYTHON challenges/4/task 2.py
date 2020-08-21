from random import randint
number = randint(1,101)
count = 0
print("Guess the random number between 1 and 100.\nEnter your guess")
valid = True
while valid == True:
    try:
        guess = int(input(">>> "))
        count = count + 1
        if 0 < guess < number:
            print("Higher")
        elif number < guess <= 100:
            print("Lower")
        elif guess == number:
            valid = False
        else:
            print("Only Enter numbers bewten 1 and 100")
            count = count - 1
    except:
        print("Not a valid number")
print("Correct! Well Done. \nthe random number was",number,
      "You took",count,"Guesses")
