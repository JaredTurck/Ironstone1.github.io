class aa():
    def __init__(self):
        self.t = True

    def toggle(self):
        if self.t == True:
            self.t = False
        elif self.t == False:
            self.t = True
        print(self.t)

a = aa()
a.toggle()
