#given 2 dimmensions, 
#find tiles that will square the plane

#take the shortest length of XY
#subtract the shirtest length from the larger length
#record the new length
# return the new shape

def tile(x, y):
    if x > y:
        square = x - y
        n = x
        while n > 0:
            n = n - square

        if n == 0:
            return square
        else:
            n = n + square

        if x == n:
            return x
        else:
            print([x, y])
            tile(n, y)

    elif y > x:
        square = y - x
        n = y
        while n > 0:
            n = n - square

        if n == 0:
            return square
        else:
            n = n + square

        if y == n:
            return y
        else:
            print([x, y])
            tile(y, n)

    elif x == y:
        return x
