import random
number = input("Enter a number for the computer to guess")
while number.isidigit()!=True:
    number = input("Not a valid Number!\n>>> ")

guess = random.randint(0,100);
