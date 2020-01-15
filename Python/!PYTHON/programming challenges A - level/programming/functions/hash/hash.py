def run(Text):
    k = "".join([str(ord(i)) for i in str(Text)])
    k = int(k) ** .02

    n = ("%s" % k).split(".")
    n = [n[0], n[1] + ("1"*("%20s" % k).count(" "))]

    return (n[0] + "$" + hex(int(n[1]))[2:]).encode("utf-8")
