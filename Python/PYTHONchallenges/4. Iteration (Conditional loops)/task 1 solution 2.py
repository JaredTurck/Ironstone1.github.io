temp = []
for i in range(8):
    while len(temp) < i:
        user = input("Enter Temperature "+str(i)+": ")
        try:
            if -40 <= int(user) <= 55:
                temp.append(int(user))
            else:
                print("Please enter a temperature between -40 and 55!")
        except:
            print("Incorrect Input!")
print("This weeks average temperature was:",str(round(sum(temp)/len(temp)))+"°C")
