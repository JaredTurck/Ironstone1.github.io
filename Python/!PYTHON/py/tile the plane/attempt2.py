
def tile(x, y):
    if x > y:
        square = x - y
        if x / square % 1 == 0:
            return square
        else:
            x = (x / square % 1) * x
            print([x, y])
            tile(x, y)

    elif y > x:
        square = y - x
        if y / square % 1 == 0:
            return square
        else:
            y = (y / square % 1) * y
            print([x, y])
            tile(x, y)
    else:
        print([[x, y]])
