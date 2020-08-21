countries =[["UK", "London", 66, "British Pounds", 123],
           ["Mexico", "Guadalajara", 121, "Mexican peso", 85],
           ["Palau", "Melekeok", 21, "United States Dollar", 90],
           ["china", "Bejing", 1376, "reninbi yuan", 94]]
#for i in range(len(countries)):
for row in countries:
    print("country:",countries[0]) # prints first county in main list 4 times

for row in countries:
    print("country:",row[0])
    print(row[0],"capital city is ",row[1])
    print(row[0],"population in millions ",row[2])
    print(row[0],"currency is ",row[3])
    print(row[0],"mobile phones per 100 people ",row[4])

#adding another country
new_country=[]
name=input("Please type a new country name")
new_country=[].append(name)
capital=input("Please enter the capital city")
new_country=[].append(capital)
population=input("Please enter the population in millions")
new_country=[].append(population)
currency=input("Please enter the currency")
new_country=[].append(currency)
phones=input("Please enter the mobile phones per 100 people")
new_country=[].append(phones)

#prints the varibles value you entered
print("")
print("you country is ",name)
print("your capital city is ",capital)
print("your population in millions is ",population)
print("your currency is ",currency)
print("your mobile phones per 100 people is ",phones)

input("")
