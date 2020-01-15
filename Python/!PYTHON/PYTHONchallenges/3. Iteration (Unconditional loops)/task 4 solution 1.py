valid = True
while valid == True:
    try:
        InitialLoan = loan = float(input("Enter initial loan £"))
        years = int(input("Enter number of years for the loan: "))
        intrest = float(input("Enter percentiage of interest per year %"))
        if float(intrest) or int(intrest):
            valid = False
    except:
        print("Inccorect Value!")

for i in range(1,years+1):
    intrestValue = (loan * intrest) / 100
    total = round(loan + intrestValue,2)
    print("Year ",i,": £",loan,"x ",intrest,"%=£",
          intrestValue," Total=£",total,sep="")
    loan = total
print("you need to pay £",round((total / 5)/12,2),
      " per month, to repay your loan in ",years," years",sep="")
print("you will pay £",total-InitialLoan,"in intrest, over",years,"years")
