count = 1

for x in range(25,50):
    for z in list([i for i in range(25,50)][::-1]):
        print("'"+str(count)+"':")
        print("  id: " + str(count))
        print("  WorldName: world")
        print("  X: " + str(x))
        print("  Z: " + str(z))
        
        count += 1

#numberOfLocations: 168
