import random, time

r = random.Random()

def absolute(n):
    if n < 0:
        return ~n+1
    return n

def test_speed():
    start = time.time()
    count = 0
    while time.time() < start +1:
        r.random()
        #r.randint(0, 100)
        #(1 ** 0.2) %1
        count += 1
    return count

# speeds
# r.random - 2,147,260
# oficial - 8,156,546

# str(int) - 4,265,159
# memoryview - 4,174,825
# hash(str) - 6,875,127
# hash(int) - 7,549,858
# abs(int) - 7,540,249

# absolute - 6,012,982
