def score(myList,file):
    csv_file=csv.reader(file) #reads csv file
    for row in csv_file:
        myList.append(row)
        myList.sort()
        scores.sort
    return myList
import csv
scores = []
team = input("what team would you like to select? \nA) Camberwick Green CC \nB) Trumpton CC \nA or B? ")
team = team.upper()
if team == "A":
    print("you have selected: Camberwick Green CC")
    file= open("CamberwickGreen.csv")
    scores = score (scores,file)
elif team == "B":
    print("you have selected: Trumpton CC")
    file= open("TrumptonCC.csv")
    scores = score (scores,file)
print(scores)
scores.sort()
for row in scores:
    print(row[0],"The highest score was: ",max(row[1:6]))
#
    print(row[0],end=" ")
    length = len(scores)
    total = 0
    for i in range(1,length):
        total = total + int(row[i])
    average = total/length-1
#

    temp=[]
    for i in range(1,length):
        temp.append,row[i]
        temp.sort()

    for score in temp:
        print (score, end=" ")
    print(average)
        

    

