def thief(n):
    import itertools

    gen = itertools.combinations_with_replacement(str(n), 4)
    combinations = []

    for i in gen:
        if i not in combinations:
            combinations.append(i)
            print("".join(i))
