print("Enter the time in seconds for each pupil:")
pupil = []
for i in range(1,51):
    time = True
    while time == True:
        try:
            print("Pupil",i,end=": ")
            time = int(input(""))
            pupil.append(time)
        except:
            print("Not a valid time")
average = sum(pupil) / len(pupil)
print("The average time was",round(average,2))
