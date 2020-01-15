import hashlib
File = open("RainbowTable.txt","a")
counter = 308854
a = File.write
while True:
    counter += 1
    PlainTextNumbers = str(counter)
    Hash = hashlib.sha512((PlainTextNumbers).encode("ascii")).hexdigest()
    if Hash in open("RainbowTable.txt").read():
        print("You already Hashed:",(PlainTextNumbers))
    else:
        a("\nHash: "),a(Hash),a("   '"),a(PlainTextNumbers),a("'")
        print("Hashed!",(PlainTextNumbers))
