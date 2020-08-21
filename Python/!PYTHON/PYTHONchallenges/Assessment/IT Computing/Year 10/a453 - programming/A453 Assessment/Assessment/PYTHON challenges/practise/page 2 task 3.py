bmi = float(input("Enter float: "))
if bmi <= 18.5:
    print("True 1")
elif 18.6 <= bmi <= 24.9:
    print("True 2")
elif 25 <= bmi <= 25.9:
    print("True 3")
elif 30 <= bmi <= 39.9:
    print("True 4")
elif bmi >= 40:
    print("True 5")
else:
    print("False")
