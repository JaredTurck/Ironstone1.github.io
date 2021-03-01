"""
Write a function that extracts the max value of a number in a list.
If there are two or more max values, return it as a list, otherwise,
return the number. You can't use any of the built in list methods.
"""

def max_value(num):
    m = num[0]
    r = 0
    for n in num:
        if n > m:
            m = n
        elif m == n:
            r += 1
    if r > 1:
        return [m for i in range(r)]
    else:
        return m
        
def test():
    assert max_value([31, 7, 2, 13, 7, 9, 10, 13]) == 31
    assert max_value([1, 3, 9, 5, 1, 7, 9, -9]) == [9, 9]
    assert max_value([97, 19, -18, 97, 36, 23, -97]) == [97, 97]
    assert max_value([-31, -7, -13, -7, -9, -13]) == [-7, -7]
    assert max_value([-1, -3, -9, -5, -1, -7, -9, -9]) == [-1, -1]
    assert max_value([107, 19, -18, 79, 36, 23, 97]) == 107
