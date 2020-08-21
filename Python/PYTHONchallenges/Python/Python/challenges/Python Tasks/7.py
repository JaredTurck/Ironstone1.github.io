print("Enter the time in seconds for each pupil:")
pupilTime = []
for i in range(50):
    pupil = input("Pupil "+str(i+1)+": ")
    while pupil.isdigit()!=True:
        pupil = input("Not a valid Time!\nPupil "+str(i+1)+": ")
    pupilTime.append(pupil)
pupilTime = [int(pupilTime[x]) for x in range(len(pupilTime))]
print("The average time was:",round(sum(pupilTime)/len(pupilTime),2),"seconds")
