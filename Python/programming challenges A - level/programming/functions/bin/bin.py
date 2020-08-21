def str2base(Text, base):
    n = "".join([format(ord(i), form[base]) for i in str(Text)])

    return n[1:]

form = {2 : " 09b", 16 : " 02x", 8 : " 04o", 10 : " "}
