import csv
with open("task-1.csv","r") as file:
    reader = csv.reader(file)
    Horses = list(reader)
valid=False
while valid==False:
    try:
        maxHeight = int(input("Maximum Height: "))
        maxAge = int(input("Maximum age: "))
        valid=True
    except:
        print("Not a valid input")
answer = []
for a in range(0,len(Horses)):
    if int(Horses[a][1]) <= maxHeight:
        if int(Horses[a][2]) <= maxAge:
            answer.append(Horses[a])
for i in range(0,len(answer)):
    print(answer[i][0],answer[i][1],"Years",answer[i][2],"Hands")
