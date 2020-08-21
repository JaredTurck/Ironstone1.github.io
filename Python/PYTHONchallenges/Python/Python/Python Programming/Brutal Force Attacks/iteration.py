Chr = "abcdefghijklmnopqrstuvwxyz"
Hash = "hello"
Text = [""]
Max = 5

while len(Text) <= Max:
    for i in range(len(Chr)):
        Text[len(Text)-1] = Chr[i]
        print("".join(Text))
    
    if Text == list(Text[0] * len(Text)):
        Text = list(Chr[0] * len(Text))
        Text.append(Chr[0])
    else:
        try:
            a = Text.index(Chr[len(Chr)-1])-1
            Text[Text.index(Chr[len(Chr)-1])-1] = Chr[Chr.index(Text[a])+1]
        except:
            a = Text.index(Chr[len(Chr)-1])-1
            Text[Text.index(Chr[len(Chr)-1])-1] = Chr[Chr.index(Text[a])+1]
            Text[Text.index(Chr[len(Chr)-1])] = Chr[0] # Z --> A
