user = input("How much of the Fibonacci sequience should I display? ")
while user.isdigit()!=True:
    user = input("Not a valid input!\n>>> ")
number = [0,1]
for i in range(int(user)):
    number.append(number[len(number)-1] + number[len(number)-2])
print(*number)
