menu = int(input("Fahrenheit and Centigrade converter\nEnter option from the list:\n1) convert Fahrenheit to Centigrade\n2) convert Centigrade to Fahrenheit\n>>> "))
if menu == 1:
    Fahrenheit = int(input("Enter your Fahrenheit temperature: "))
    answer = (Fahrenheit - 32) * 5/9
    print(Fahrenheit,"Fahrenheit is",answer,"Centigrade")
if menu == 2:
    Centigrade = int(input("Enter your Centigrade temperature: "))
    answer = Centigrade * 1.8 + 32
    print(Centigrade,"Centigrade is",answer,"Fahrenheit")
input("Press enter to continue..."), exit() 
