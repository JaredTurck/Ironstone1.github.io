import random

def get_num():
    Guess = input('Enter Number: ')
    while Guess.isdigit() != True:
        print('Invalid Input!')
        Guess = input('Enter Number: ')
    return int(Guess)

def start_game():
    Num = random.randint(0,100)
    Counter = 0
    Guess = get_num()
    while Guess != Num:
        if Guess > Num:
            print('Lower!')
        elif Guess < Num:
            print('Higher')
        Guess = get_num()
        Counter += 1
    print('Welldone the number was ', Num,'!')
    print('That took', Counter, 'tries')

while True:
    start_game()
    End = input('Do you want to play again? ')
    if End.lower()[0] != 'y':
        exit()