valid = print("Color Generator:")
while valid != True:
    try:
        Red = int(input("Enter number of Red: "))
        Blue = int(input("Enter number of Blue: "))
        Green = int(input("Enter number of Green: "))
        if 0 <= Red <= 255 and 0 <= Green <= 255 and 0 <= Blue <= 255:
            valid = True
        else:
            print("\nError out of range input! only enter value from 0 to 255")
    except:
        print("\nNot a valid input!")

total = Red+Green+Blue
if total == 0:
    RedPercent = BluePercent = GreenPercent = "33.33%"

else:
    RedPercent = ("RED="+str(round(((Red/total)*100),2))+"%")
    BluePercent = ("Blue="+str(round(((Blue/total)*100),2))+"%")
    GreenPercent = ("Green="+str(round(((Green/total)*100),2))+"%")

print("your color is made up of:",RedPercent,BluePercent,GreenPercent)
print("your color in RGB format: Red=",Red,"  Blue=",Blue,"  Green=",Green,sep="")
print("your color in hex format:","#%02x%02x%02x" % (Red, Blue, Green)
