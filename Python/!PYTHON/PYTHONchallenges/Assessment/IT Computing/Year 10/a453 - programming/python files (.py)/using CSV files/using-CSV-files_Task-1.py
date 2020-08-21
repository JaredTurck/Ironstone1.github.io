def score():
    csv_file=csv.reader(file)
    global scores
    scores=[]
    for row in csv_file:
        scores.append(row)
    print(scores)
import csv
team = int(input("what team would you like to select? \n1) Camberwick Green CC \n2) Trumpton CC \n1 or 2? "))
if team == 1:
    print("you have selected: Camberwick Green CC")
    file= open("CamberwickGreen.csv")
    score()
elif team == 2:
    print("you have selected: Trumpton CC")
    file= open("TrumptonCC.csv")
    score()
