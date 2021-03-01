from random import randint as r

user, rand = int(input("Enter guess: ")), r(1,100)
while user != rand:
    ([print("Higher") if user < rand else print("Lower")])
    user = int(input("Enter guess: "))

