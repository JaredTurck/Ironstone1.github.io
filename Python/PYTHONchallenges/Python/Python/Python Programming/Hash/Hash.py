__doc__ = "A simple hashing algorithm script"
def hash(PlainText):
    '''Usage: Hash.hash(<Encoded string>)'''
    try:
        pt1 = hex(sum([((i**i)**2)<<128 for i in PlainText]))[:128]
        key = "$%s$%s" % tuple([ord(i) % 10 for i in pt1[::64]])
        return (key + pt1).encode("utf-8")
    except:
        print("TypeError: Unicode-objects must be encoded before hashing")
