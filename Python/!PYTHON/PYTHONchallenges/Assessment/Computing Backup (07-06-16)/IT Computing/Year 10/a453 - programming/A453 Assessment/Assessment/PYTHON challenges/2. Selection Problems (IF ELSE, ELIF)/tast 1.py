valid = True
while valid == True:
    try:
        temp = int(input("Enter the number of current temperature: "))
        valid = False
    except:
        print("Not a valid temperature")
if temp < 1:
    state = "Solid"
elif temp in range(1,100):
    state = "Liquid"
else:
    state = "Gas"
print("At",temp,"degrees centigrade, water will be a",state)
