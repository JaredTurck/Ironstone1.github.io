import hashlib, csv
i = 0
while True:
    i += 1
    TextNum = str(i)
    Hash = hashlib.sha512((TextNum).encode("ascii")).hexdigest()
    if Hash in open("Rainbow Table.csv").read():
        print("You already Hashed:",(TextNum))
    else:
        with open("Rainbow Table.csv","a") as Table:
            writer = csv.writer(Table)
            for row in writer:
                row[1] = Table.write(Hash)
                row[2] = Table.write(TextNum)
                print("Hashed!",(PlainTextNumbers))

#Table.write(Hash),Table.write(PlainTextNumbers)
#Table.close()
