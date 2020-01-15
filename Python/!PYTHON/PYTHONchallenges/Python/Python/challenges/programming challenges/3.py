C = input("How many Carbon attoms woiuld you like? ")
while C.isdigit()!=True:
          C = input("Not a valid number!\n>>> ")
C = int(C)
print("The molecular mass of C%sH%s is %s" % (C,((C*2)+2),(12*C)+(C*2)+2))
