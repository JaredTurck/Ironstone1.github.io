class Class(object):
    def __init__(self, Text):
        self.Text = Text
        
    def length(Text):
        count = 0
        for i in Text:
            count += 1
        return count

    def dataType(Text):
        try:
            if Text % 1 == 0:
                print("<Type 'int'>")
            else:
                print("<Type 'float'>")
        except:
            print("<Type 'str'>")

    def lst(Text):
        return [i for i in Text]

print(Class.length("Hello"))
