def Pi(n):
    assert isinstance(n, int)
    assert 0 <= n <= pow(10,9)
    return ["3" if n == 0 else open("pi-10^9.txt", "r").read()[0:n+2]][0]
