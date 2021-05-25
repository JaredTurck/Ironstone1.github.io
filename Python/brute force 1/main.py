import itertools
import string

# password itter
chars = string.ascii_lowercase + string.digits
for password_length in range(1, 9):
    for guess in itertools.product(chars, repeat=password_length):
        guess = ''.join(guess)
    print(guess)
