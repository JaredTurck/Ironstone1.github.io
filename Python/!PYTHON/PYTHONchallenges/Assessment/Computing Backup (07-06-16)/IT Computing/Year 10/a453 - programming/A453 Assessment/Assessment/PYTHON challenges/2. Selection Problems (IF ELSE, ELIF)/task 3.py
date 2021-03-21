name = input("Enter your name: ")
valid = True
while valid == True:
    try:
        height = int(input("Enter your height in CM: "))
        mass = int(input("Enter your weight is Kg: "))
        valid = False
    except:
        print("invalid, input!")
bmi = (mass / (height/100 * height/100))
if bmi <= 18.5:
    weight = "Underweight (as thin as a rake)"
elif 18.6 <= bmi <= 24.9:
    weight = "A Healthy Weight (Good job!)"
elif 25 <= bmi <= 29.9:
    weight = "Overweight (squirrel in hibernation)"
elif 30 <= bmi <= 39.9:
    weight = "Obese (fat cat)"
elif bmi >= 40:
    weight = "Very Obese, (Baby Hippo)"
print(name,"You are",weight,"Your BMI is",round(bmi,1))
