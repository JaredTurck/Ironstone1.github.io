menu = input(open("Menu.txt").read())

while menu not in [str(i) for i in range(1,12)]:
    menu = input("Inccorect Input\n>>> ")

Dict = {"1":"+","2":"-","3":"*","4":"/","5":"**","6":"%","7":"<<","8":">>","9":"&","10":"|","11":"^",}
(num1, num2) = ("", "")
while (num1 + num2).isdigit()!=True:
    num1 = input("Enter your first number: ")
    num2 = input("Enter your second number: ")
    if (num1 + num2).isdigit()!=True: print("\nNot a valid input!")

print(num1, Dict[menu], num2, "=",eval(num1+Dict[menu]+num2))
