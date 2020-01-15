import csv, hashlib, datetime, os
HashList = []
GeneratedHash = []
index = []
counter = 0
valid = True
while valid == True:
    hashValue = ("31bca02094eb78126a517b206a88c73cfa9ec6f704c7030d18212cace820f025f00bf0ea68dbf3f3a5436ca63b53bf7bf80ad8d5de7d8359d0b7fed9dbc3ab994dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a40b244112641dd78dd4f93b6c9190dd46e0099194d5a44257b7efad6ef9ff4683da1eda0244448cb343aa688f5d3efd7314dafe580ac0bcbf115aeca9e8dc114")
    if len(hashValue)/128 in range(1,len(hashValue)):
        valid = False
    else:
        print("\nYour Hash value is wrong, did you paste it accurately?")
count = int(len(hashValue))
print("Decrypting\nYour Hash contains",int(len(hashValue)/128),"characters")
print("your SHA512 algorithm hash will be be cracked!\nwith a brute force attack!...")
for i in range(0,int(len(hashValue)/128)):
    HashList.append(hashValue[count-128:count])
    count = count -128
for a in range(0,10000):
    HASH = hashlib.sha512(str([a]).encode("ascii")).hexdigest()
    GeneratedHash.append(HASH)
for HashCompare in range(0,len(GeneratedHash)):
    for b in range(0,len(HashList)):
        if str(HashList[b]) == str(GeneratedHash[HashCompare]):
            index.append(HashList[b])
            print(index)
