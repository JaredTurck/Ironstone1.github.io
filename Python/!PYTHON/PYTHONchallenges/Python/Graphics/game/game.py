import random
locationFile = open("location.txt","r").readlines()
location = locationFile[random.randint(0,len(locationFile)-1)]
if "%wood%" in location:
    woodFile = open("%wood%.txt","r").readlines()
    wood = woodFile[random.randint(0,len(woodFile)-1)]
    location = [location.replace("%wood%",wood)]
if "%terrain%" in location:
    terrainFile = open("%terrain%.txt","r").readlines()
    terrain = terrainFile[random.randint(0,len(terrainFile)-1)]
    location = [location.replace("%terrain%",terrain)]
print(*location,sep="",end="")
