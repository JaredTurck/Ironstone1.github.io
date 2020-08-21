file = open("file.txt","r").read()
List = []
[(List[0].append(["",0])) for i in range(len(file))]
for i in range(len(file)):
    List[i][0] = file[i]
    List[i][1] = List[i][1]+1
        
