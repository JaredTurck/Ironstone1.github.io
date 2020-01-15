while True:
    try:
        value = [int(input("Input number %d: " %(i))) for i in range(1,4)]
        break
    except:
        print("\nNot a valid Input!")
print("The largest number you inputted is: %d" %(sorted(value)[len(value)-1]))
