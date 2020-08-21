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
for i in range(0,len(Horses)):
    if int(Horses[i][1]) <= maxHeight:
        if int(Horses[i][2]) <= maxAge:
            answer.append(Horses[i])
for a in range(0,len(answer)):
    print(answer[a][0],answer[a][1],"Years",answer[a][2],"Hands")
