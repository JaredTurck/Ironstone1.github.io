import csv
with open("task-2.csv","r") as file:
    reader = csv.reader(file)
    friends = list(reader)
