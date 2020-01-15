import random
Ascii = open("Ascii.txt").read()
File = open("File.txt","w")
for i in range(0,12500):
    for y in range(0,3):
        Random = random.randint(0,25)
        File.write(Ascii[Random].upper())
    Random = random.randint(0,25)
    File.write(Ascii[Random])
File.close()
