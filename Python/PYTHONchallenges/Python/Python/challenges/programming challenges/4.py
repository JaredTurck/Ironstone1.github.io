temp = str()
while isinstance(temp, int)!=True:
          try:
                    temp = int(input("Enter the current temperature: "))
          except:
                    temp = print("Inccorect Input!")
if temp <= 0:
          state = "solid"
elif 1 <= temp < 100:
          state = "liquid"
else:
          state = "gas"
print("at",str(temp)+"°C water will be a",state+"!")
