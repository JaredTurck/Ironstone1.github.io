import random

def time2mph(time1, time2):
    tm = [[int(i) for i in ii.split(":")] for ii in [time1, time2]]
    time = [[ii[i]*[3600,60,1][i] for i in range(3)] for ii in [tm[0],tm[1]]]

    return round(3600 / (sum(time[1]) - sum(time[0])), 2)

def user(Q):
    while True:
        user = input(Q).split(":")
        if len(user) == 3 and "".join(user).isdigit() == True:
            return ":".join(user)
        else:
            print("Not a valid Input!")

def numPlate(plate):
    plate = plate.replace(" ","0")
    valid = {0:"isalpha",1:"isalpha",2:"isdigit",3:"isdigit",4:"isdigit",
             5:"isdigit",6:"isdigit",7:"isdigit"}

    if len(plate) != 8:
        return "Invalid"

    plate = False not in [getattr(plate[i], valid[i])() for i in valid]
    return ["Invalid" if plate == False else "Valid"][0]

def speed():
    print("A car is going past a speed camera! Enter time in format HH:MM:SS")
    MPH = time2mph(user("First time: "), user("Second time: "))
    plate = numPlate(input("Enter your cars number plate: "))

    print("\nYour car is traveling at %s MPH!" % (MPH))
    print("Number plate: %s" % (plate))


# Extension:
def randData(n):
    file = open("Speed Tracker Data.csv", "w")

    for i in range(n):
        mmss1 = "%s:%s" % tuple([random.randint(0,40) for i in range(2)])
        time1 = "%s:" % (random.randint(0,24)) + mmss1

        mmss2 = [random.randint(int(time1.split(":")[i+1])+1,50) for i in range(2)]
        time2 = "%s:%s:%s" % tuple([int(time1.split(":")[0])] + mmss2)

        plate_1 = [chr(random.randint(0,25)+65) for i in range(2)]
        plate_2 = [int(random.randint(0,9)) for i in range(5)]
        plate = "%s%s%d%d %d%d%d" % tuple(plate_1 + plate_2)

        file.write("%s,%s,%s\n" % (plate, time1, time2))
    file.close()

def OpenData(file="Speed Tracker Data.csv"):
    file = open(file).readlines()
    file = [line.replace("\n","").split(",") for line in file]
    speed_limit = []
    below = []

    for line in file:
        mph = time2mph(line[1], line[2])
        plate = numPlate(line[0])
        line = line + [mph, plate]

        if float(line[3]) >= 60:
            speed_limit.append(line)
        else:
            below.append(line)

    print("Cars Above speed limit:")
    [print(i) for i in speed_limit]

    #print("Cars Below speed limit:")
    #[print(i) for i in below]
