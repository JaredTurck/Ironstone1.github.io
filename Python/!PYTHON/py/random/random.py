
class Random():
    def __init__(self):
        self.seed = abs(hash(str(memoryview(b""))))

    def random(self):
        self.seed = self.seed + 1
        return (self.seed ** 0.1) % 1

    def randint(self, start, end):
        r = (((self.seed + end) - start) % (end) ) + start + 1
        self.seed = self.seed + 1
        return r

    def shuffle(self, array):
        o = []
        for i in array:
            t = self.randint(0, len(array)-1)
            while t in o:
                t = self.randint(0, len(array)-1)
            o.append(t)
        return [array[x] for x in o]

r = Random()
