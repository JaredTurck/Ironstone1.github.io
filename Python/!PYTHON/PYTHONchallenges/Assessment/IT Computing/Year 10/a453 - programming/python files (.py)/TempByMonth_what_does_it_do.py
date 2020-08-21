import csv


f = open('TempByMonth.csv')

csv_f = csv.reader(f)

newlist = []



for row in csv_f:

    row[1] = int(row[1])
    row[2] = int(row[2])
    row[3] = int(row[3])
    row[4] = int(row[4])

    newlist.append(row[0:5])

    
    
print(newlist)

