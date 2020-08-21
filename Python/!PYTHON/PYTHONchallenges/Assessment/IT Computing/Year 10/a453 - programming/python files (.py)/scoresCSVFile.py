import csv
file= open ("scores.csv")
csv_file=csv.reader(file)
villains=[]
for row in csv_file:
    villains.append(row)
print (villains)

file= open("scores.csv","w",newline="")
csv_file=csv.writer(file)

name=input("name? ")
pay=float(input("pay £"))
temp=[name,pay]
villains.append(temp)
for item in villains:
    csv_file.writerow(item)
file.close()
