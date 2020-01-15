def find(word, FileName="Text.txt"):
    Text = [i.rstrip("\n") for i in(open(str(FileName)).readlines())]
    Text = [line.replace("\t","") for line in Text]

    def across(Word, Direction):
        if Word in Text[i]:
            x = Text[i].index(Word)
            print("%s (across %s, Down %s, Direction: %s)"
                  % (word, x+1, i+1, Direction))

    def down(Word, Direction):
        if Word[0] in Text[i]:
            x = Text[i].index(Word[0])
            found = "".join([Text[y][x] for y in range(len(Text))])
            if Word in found:
                print("%s' (across %s, Down %s, Direction: %s)"
                      % (word, x, found.index(Word), Direction))

    for i in range(len(Text)):
        across(word, "Fowards")
        across(word[::-1], "Backwards")
        down(word, "Down")
        down(word[::-1], "Up")
