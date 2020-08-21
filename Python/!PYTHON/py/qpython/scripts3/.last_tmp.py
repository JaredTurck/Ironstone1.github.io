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