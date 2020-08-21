import hashlib
index = [0,1,2,3,4,5]
HashedText = []
sha = [512]
for a in range(0,len(index)):
    ASCII = hashlib.sha(str(index[a]).encode("ascii")).hexdigest()
    HashedText.append(ASCII)
    print(HashedText[a])
