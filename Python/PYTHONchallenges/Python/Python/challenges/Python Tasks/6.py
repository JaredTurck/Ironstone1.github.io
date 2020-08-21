Cm = Kg = str("Enter the following information bellow:")
while isinstance(Cm+Kg,int)!=True:
    try:
        Cm = int(input("Enter your height in Center Meters 'CM': "))
        Kg = int(input("Enter your weight in Kilograms 'kg': "))
        if str(Cm).isdigit()!=True or str(Kg).isdigit()!=True:
            Cm = Kg = str(print("Do not enter decimal numbers!\n"))
    except:
        M = Kg = str(print("Inccorect input!\n"))
if (Kg/((Cm/100)*2)) < 18.5:
    bmi = "underweight"
elif 18.5 <= (Kg/((Cm/100)*2)) <= 24.9:
    bmi = "healthy weight"
elif 25 <= (Kg/((Cm/100)*2)) <= 25.9:
    bmi = "overweight"
elif 30 <= (Kg/((Cm/100)*2)) <= 39.9:
    bmi = "obese"
else:
    bmi = "very obese"
print("Your Bmi is",str(round(Kg/((Cm/100)*2),2))+", you are",bmi)
