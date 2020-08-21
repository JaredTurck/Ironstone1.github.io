temp = print("Enter the number of current temperature bellow:")
while isinstance(temp, int) !=True:
    try:    
        temp = int(input("Temperature: "))
    except:
        print("Not a valid temperature!")
if temp <= 0:
    form = "Solid"
elif 1 <= temp <= 99:
    form = "Liquid"
else:
    form = "Gas"
print("At",str(temp)+"°C, water will be a",form)
