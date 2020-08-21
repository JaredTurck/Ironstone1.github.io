temperatures = []
print("Please enter the seven temperatures")
valid = True
while valid == True:
    try:
        print("enter temperature",len(temperatures)+1,": ",end="")
        user = int(input())
        if -40 <= user <= 55:
            temperatures.append(user)
            if len(temperatures) == 7:
                valid = False
        else:
            print("\nPlease enter a temperature between –40 and 55")
    except:
        print("That is not a valid temperature!")
print("This weeks average, rounded to 0 decimal places was:",
      round(int(sum(temperatures)/len(temperatures)),0),"degrees centigrade")
