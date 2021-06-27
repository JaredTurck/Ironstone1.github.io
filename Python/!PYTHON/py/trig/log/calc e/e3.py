from fractions import Fraction
s = 100_000
x = 1
n = 1

for i in range(s, 1, -1):
    x *= i
    n += x

result = Fraction(n, x) + 1

with open("file.txt", "w") as file:
    file.write(str(result))
