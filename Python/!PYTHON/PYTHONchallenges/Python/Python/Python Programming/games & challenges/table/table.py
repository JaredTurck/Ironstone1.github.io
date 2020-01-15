class table(object):
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
    
    def create(self, *Data, fix=False):
        table = ""
        for i in range(self.cols):
            table += ("\n"+"--"*self.rows+"-"+"\n"+"|%s"*self.rows+"|")
        table += ("\n"+"--"*self.rows+"-")
        space = [" " for i in range(table.count("%s")-len(list(Data)))]

        if fix == True:
            length = 0
            output = list((Data + tuple(space))[0])
            
            for item in output:
                if len(item) > length:
                    length = len(item)

            for item in range(len(output)):
                while len(output[item]) < length:
                    output[item] += " "
            return table % tuple(output)
        else:
            return table % (Data + tuple(space))

def file(fileName):
    data = []
    for line in open(fileName).readlines():
        line = line.replace("\n","")
        line = line.split(",")
        for item in line:
            data.append(item)
    return tuple(data)
