import os, hashlib

root = input("Path: ")
Files = {}
log = open("log.txt", "w")

def Print(Text):
    print(Text)
    log.write(Text+"\n")

Print("Please wait.. generating Checksum for ALL files!")
for path, subdir, file in os.walk(root):
    try:
        for name in file:
            F = os.path.join(path, name)
            Files[F] = hashlib.sha512(open(F, "rb").read()).hexdigest()
    except:
        Print("PermissionError '" + F + "'! ")


Print("looking for duplicates...")
Hash = list(Files.values())
Duplicate = {}

for f in Files:
    if Hash.count(Files[f]) > 1:
        if Files[f] in Duplicate:
            Duplicate[Files[f]].append(f)
        else:
            Duplicate[Files[f]] = [f]

Print("Finsihed scan!")
for key in Duplicate:
    Print("\nFound Duplicates:")
    for Path in Duplicate[key]:
        Print(Path)

log.close()
