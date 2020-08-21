import csv                      #Import the csv module
file= open ("supervillains.csv")#open the csv file as a variable
csv_file=csv.reader(file)       #iterate through the file, reading the file 
villains=[]                     #create new empty list
for row in csv_file:            #iterate through csv_file (data)
    villains.append(row)        #append row data to list
print (villains)                #print list


file= open("supervillains.csv","w",newline="")
csv_file=csv.writer(file)
name=input("name=")
pay=int(input("pay="))
temp=[name,pay]
villains.append(temp)
for item in villains:
    csv_file.writerow(item)
file.close()
