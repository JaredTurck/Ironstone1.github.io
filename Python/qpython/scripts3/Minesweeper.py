import random
from random import randint

Grid = [['.' for i in range(5)] for ii in range(5)]

for i in range(3):
    Grid[randint(0,4)][randint(0,4)] = 'X'

def print_grid():
    print('-'*12)
    for i in Grid:
        print('|'+'|'.join(i)+'|')
        print('-'*12)

print_grid()

User = input('Enter Guess')
while True:
    if len(User) == 2:
        if User[0].isalpha():
            if User[1].isdigit():
                return User