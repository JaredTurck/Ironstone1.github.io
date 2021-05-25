from random import randint as r;r = r(0, 100)
while (lambda t, n : [[print("Lower"),0] if t < n else [print("Higher"),1] if t > n else [print("Correct"),2]][0])(r, int(input("Enter Guess: ")))[1] != 2: pass
