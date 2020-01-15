import random

def rand_onion():
    return "".join(["abcdefghijklmnopqrstuvwxyz0123456789"[random.randint(0,35)] for i in range(16)]) + ".onion"

while True:
    input(rand_onion())
