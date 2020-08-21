import csv
file= open ("supervillains.csv")
csv_file=csv.reader(file)
villains=[]
for row in csv_file:
    villains.append(row)
file.close()
print (villains)
for item in villains:
    print(item[0],item[1])




file= open("supervillains.csv","w",newline="")
csv_file=csv.writer(file)
name=input("name=")
pay=int(input("pay="))
temp=[name,pay]
villains.append(temp)
for item in villains:
    csv_file.writerow(item)
file.close()

        
        
