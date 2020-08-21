number = [0,1]
for i in range(10):
    number.append(number[len(number)-1] + number[len(number)-2])
print(*number)
