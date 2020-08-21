import pronouncing
file = open("file.txt","r").readlines()
for i in range(len(file)):
    file[i] = file[i].rstrip("\n")
    pronouncing.search(file[i])
