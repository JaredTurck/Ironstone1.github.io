# Full prinable ASCII:
#characters = "".join([chr(i) for i in range(33,127)])

# Just uppercase + lowercase letters and numbers:
characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

Text = [list(characters[0])*8][0]
while len(Text) <= 10:
    for i in range(len(characters)):
        Text[len(Text)-1] = characters[i]
        #print("".join(Text))
        
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
    
