import hashlib
count = 0
file = open("sha512.txt","w")
characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
Text = [""]
while len(Text) <= 10:
    for i in range(len(characters)):
        Text[len(Text)-1] = characters[i]

        Hash = hashlib.sha512("".join(Text).encode("utf-8")).hexdigest()
        [file.write(i) for i in [Hash,",","".join(Text),"\n"]]
        
    if Text == list(characters[len(characters)-1] * len(Text)):
        Text = list(characters[0] * (len(Text)+1))
    else:
        if Text[0] == characters[len(characters)-1] and len(Text) >= 3:
            Text[0] = ""
        
        Index = Text.index(characters[len(characters)-1])
        Text[Text.index(characters[len(characters)-1])-1] \
    = characters[characters.index(Text[Text.index(characters[len(characters)-1])-1])+1]
        Text[Index] = characters[0]
        if Text[0] == "":
            Text[0] = characters[len(characters)-1]

    count += 1
    if count >= 1000:
        count = 0
        file.close()
        file = open("sha512.txt","a")
