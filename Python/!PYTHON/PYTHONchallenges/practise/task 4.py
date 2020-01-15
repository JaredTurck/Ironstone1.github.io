loan = float(input("Enter initial loan £"))
payment = float(input("Enter how much you want to pay per month £"))
intrest = float(input("Enter percentiage of interest per month %"))

Balance = ((((loan * intrest) / 100)+ loan)- payment)
counter = 0
while Balance > 0:
    counter = counter+1
    print("Month ",counter,": £",Balance,sep="")
    Balance = round(((((Balance * intrest) / 100)+ Balance)- payment),2)
print("it will take you",counter,"Months","(",round(counter/12,2),
      "Years ), to pay back your £",loan,"loan")
