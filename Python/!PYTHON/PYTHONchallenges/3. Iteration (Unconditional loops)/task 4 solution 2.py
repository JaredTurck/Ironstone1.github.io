loan = years = intrest = str()
while str(loan+years+intrest).isdigit()!=True:
    loan = input("Enter your initial loan: ")
    years = input("Enter the number of years: ")
    INT = input("Enter the percentage of intrest %")
    if str(loan+years+intrest).isdigit()!=True:
        print("\nInccorect Input!")
loan, years, INT = int(loan), int(years), int(INT)
total = [loan]
[total.append(total[I]+(total[I]/INT)) for I in range(years)]
[print("Year",str(i+1)+": £"+str(int(total[i]))+"x",str(INT)+"%="+str(int(total[i]
/INT)),"Total="+str(int(total[i]+(total[i]/INT)))) for i in range(years)]
