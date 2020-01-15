temp = str(print("Enter the number of current temperature: "))
while temp.isdigit()==False:
    temp = input(">>> ")
    if temp.isdigit()==False:
        print("not a valid temperature!")
        
if int(temp) <= 0:
    state = "Solid"
elif int(temp) in range(1,100):
    state = "Liquid"
else:
    state = "Gas"
print("At",temp,"degrees centigrade, water will be a",state)
