import random

class useragent():
    def __init__(self):
        pass
    
    def rand_browser(self):
        self.arch = [32, 64]
        self.a = ['534.30', '420+', '537.36', '604.1.38', '537.73',
                      '537.36','605.1.15','536.30', '528.5+', '604.1.34',
                      '602.1.50', '601.3.9', '531.2+']
        print(True, self.a)

        # Browser
        self.current_webkit = random.choice(self.a)
        print(True, self.a)

    def windows_useragent(self):
        # Pick random Windows Computer
        self.rand_browser()
        self. b = True
        print(True, self.a)

    def get_useragent(self):
        # picks a random useragent method
        self.windows_useragent()
        print(True, self.a)
