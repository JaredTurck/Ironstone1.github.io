
# sum of the squares of the first one hundred natural numbers
t = 0
for i in range(1, 101):
    t += i ** 2

# square of the sum
s = sum([i for i in range(1, 101)]) ** 2

print(s - t)
