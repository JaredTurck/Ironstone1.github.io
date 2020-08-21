import itertools

def test(function,number=1,Char="0123456789"):

    found = []
    gen = itertools.combinations_with_replacement(Char,number)

    for i in gen:
        n = function(i)
        if n in found:
            return "%s: Found a collision '%s'!" % (i,n)
        else:
            found.append(n)
    else:
        print("%s, no collisions found!" % ("".join(i)))
