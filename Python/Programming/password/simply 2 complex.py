def complicate(password):
    n = [str(ord(i)) for i in str(password)]
    n = str(int("".join(n)) ** .02).split(".")

    char = "abcdefghijklmnopqrstuvwxyz"
    a = [char[int(n[1][i]) % 25] for i in [1,2,3,4]]

    return "%s%s$%s%s" % (n[0], (a[0]+a[1]).upper(), a[2]+a[3], n[1])
