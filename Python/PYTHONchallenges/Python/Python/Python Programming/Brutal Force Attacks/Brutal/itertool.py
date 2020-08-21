import itertools
def brutal(number):
    Char = "abcdefghijklmnopqrstuvwxyz"
    for item in range(number+1):
        gen = itertools.combinations_with_replacement(Char,item)
        for i in gen:
            print(i)
