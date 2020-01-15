def thief(code):
    combinations = []

    for n in range( int("9"*len(code)) ):
        combo = ("%" + "0" + str(len(code)) + "d") % (n)
        if False not in [combo.count(i) == code.count(i) for i in code]:
            if n not in combinations:
                combinations.append(combo)

    [print(i) for i in sorted(combinations)]
