valid = True
while valid == True:
    try:
        loan = int(input("Enter initial loan £"))
        years = int(input("Enter number of years for the loan: "))
        intrest = int(input("Enter perpentiage of intrest per pear %"))
        valid = False
    except:
        print("not a valid input")
for i in range(1,years+1):
    intrestValue = loan / intrest
    total = loan + intrestValue
    print("Year ",i,": £",int(loan),"x ",int(intrest),"%=£",int(intrestValue),
          " Total=£",int(total),sep="")
    loan = total
