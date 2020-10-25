from random import randint as r

def guess_number(randint=r(1,100), turns=0, user=""):
    while str(user) != str(randint): user, turns = (lambda x : [(lambda x : [[print("Lower!") if int(x) > randint else print("Higher!") if int(x) < randint else print("You took",turns,"guesses!")], x, turns+1])(int(x))[1::] if x.isdigit()==True else [print("Invalid Input!"), user,turns][1::]])(input("Enter Guess: "))[0]


