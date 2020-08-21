Carbon = input("How many Carbon atoms do you want? ")
while Carbon.isdigit()!=True:
    Carbon = input("Not a valid number of Carbon atoms!\n>>> ")
C = int(Carbon)
print("The molecular mass of C%iH%i" % (C,((C*2)+2)),"is",(C*12)+((C*2)+2))
