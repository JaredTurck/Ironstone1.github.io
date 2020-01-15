loan = duration = intrest = str(print("Intrest Calculator:"))
while str(loan+duration+intrest).isdigit()!=True:
    try:
        loan = int(input("Enter your initial loan amount: "))
        duration = int(input("Enter number of years: "))
        intrest = int(input("Enter Intrest percentage %"))
    except:
        loan = duration = intrest = str(print("Inccorect Input!"))
for i in range(duration):
    print("Year",str(i+1)+": £"+str(loan)+"x",str(intrest)+"%=£"+
    str(int(loan/intrest)),"Total=£"+str(int(loan/intrest)+loan))
    loan = int(loan/intrest)+loan
