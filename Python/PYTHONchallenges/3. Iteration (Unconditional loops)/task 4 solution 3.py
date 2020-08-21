loan = years = intrest = str()
while str(loan+years+intrest).isdigit()!=True:
    loan = input("Enter your initial loan: ")
    years = input("Enter the number of years: ")
    intrest = input("Enter the percentage of intrest %")
    if str(loan+years+intrest).isdigit()!=True:
        print("\nInccorect Input!")
loan, years, intrest = int(loan), int(years), int(intrest)
for i in range(int(years)):
    print("Year ",i+1,": £",int(loan),"x ",intrest,"%=£",int(loan/intrest),
    " Total=£",int(loan+(loan/intrest)),sep="")
    loan = int(loan+(loan/intrest))
