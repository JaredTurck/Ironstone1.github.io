time1 = input("Enter your first time: ")
time2 = input("Enter your second time: ")
time = int(time2.replace(":","")) - int(time1.replace(":",""))
print("Your car was doing %s mph" % round(3600 / time, 2))
