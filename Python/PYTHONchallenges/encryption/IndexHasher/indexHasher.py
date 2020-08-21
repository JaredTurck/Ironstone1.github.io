import csv, hashlib, datetime, os
print("=~="*11,"\n| ASCII encrypter by Jared Turck |\n","=~="*11,
      "\n\nPlease choose option from list bellow:\n1) Encrypt ASCII text with Hash",
      "\n2) Decrypt Hashed values to ASCII text\n3) Information About encrypter",
      sep="")
valid = True
while valid == True:
    try:
        menu = int(input(">>> "))
        if menu in range(1,4):
            valid = False
        else:
            print("incorrect input, please choose option from list above.")
    except:
        print("Not a valid input!")
def encryptASCII():
    user = list(input("Enter your Message to encrypt: "))
    HashedText = []
    index = []
    with open("alphabet.csv","r") as file:
        reader = csv.reader(file)
        alphabet = list(reader)
    print("Applying Hash...")
    for i in range(0,len(user)):
        if str(user[i]) in str(alphabet[0]):
            try:
                index.append(alphabet[0][i])
                print(alphabet[1])
                index.append(alphabet[0].index(index[i]))
            except:
                print(user[i],"input can not be found")
        else:
            print("'",user[i],"' is not a valid input!",sep="")
    Hash = open("HashFiles\HashText.txt","a")
    Hash.write(str(datetime.datetime.now())),Hash.write("\n")
    for a in range(0,len(index)):
        ASCII = hashlib.sha512(str(index[a]).encode("ascii")).hexdigest()
        HashedText.append(ASCII)
        Hash.write(HashedText[a])
    Hash.write("\n\n"),Hash.close()
    print("Your Hash Has been Written to 'HashText.txt'")
    os.system("start HashFiles\HashText.txt")
def decryptASCII():
    print("Copy the Hash you would like to decrypt from 'HashText.txt'",
          "and paste bellow.\nCopy only the Hash NOT the date, time or line spaces")
    os.system("start HashFiles\HashText.txt")
    HashList = []
    GeneratedHash = []
    index = []
    counter = 0
    valid = True
    while valid == True:
        hashValue = input(">>> ")
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
    for a in range(0,182):
        HASH = hashlib.sha512(str([a]).encode("ascii")).hexdigest()
        GeneratedHash.append(HASH)
    for HashCompare in range(0,len(GeneratedHash)):
        for b in range(0,len(HashList)):
            if str(HashList[b]) == str(GeneratedHash[HashCompare]):
                index.append(HashList[b])
                print("\nHashList[b]",HashList[b],"\nGeneratedHash[HashCompare]",GeneratedHash[HashCompare])
    print("INDEX:",index)
if menu == 1:
    print("You have chosen to Encrypt!")
    encryptASCII()
    input("Thank you for using my Encrypter,press enter to close program..."),exit()
elif menu == 2:
    print("You have Chosen to Decrypt")
    decryptASCII()
elif menu == 3:
    print("Informtaion: (press enter to continue...)"),input("How is the text I enter encrypted?\nIt starts with you entering your message to encrypt."),input("This message is then slit up into individual characters, and append to a list."),input("For example, if you enter ‘Hello’ the list would look like [‘H’, ’e’, ’l’, ’l’, ’o’,]."),input("Next the program opens a csv (Command Separated Values) file."),input("this file contains the alphabet (upper and lower case), numbers (0-9), and other characters (symbols)."),input("The csv file is appended to a list, and then searched using your message input (that is currently stored in a list)."),input("So the program would take the first item of your list, in this case the ‘H’ from ‘Hello’, and look for a ‘H’ in the csv file."),input("when if finds the “H”, the index number of that letter is appended to a list."),input("This process is repeated for every item in your list."),input("so next it would look for the ‘e’ and so."),input("\n\nFinally, the shift rules are applied and, the list of index numbers Is hashed individual, with the SHA-512 Algorithm."),input("So let’s say that the ‘H’ in your input has an index number of 33, the 33 is hashed not the letter ‘H’."),input("this makes you message more secure as if somebody was to decrypt it the SHA-512 Algorithm, they would get the number 33."),input("And they would have to finger out what letter the 33 stands for."), input("\n\nDECRYPTING:"),input("As hashes are designed for storing password and sensitive information in a database and over the internet. Decrypting a hash is not an easy task."), input("This program generates the SHA-512 algorithm hashes."), input("they are 128bits long and could take weeks to crack."), input("When this program generated the hash value of your message, each character’s index number in a csv field was hashed, not the letter itself."), input("This means that there are 81 possible combinations as 81 is the highest index number in the csv file.")
