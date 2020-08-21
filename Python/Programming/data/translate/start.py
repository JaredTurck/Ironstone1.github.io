data = open("data.csv").readlines()
for i in range(len(data)):
    data[i] = data[i].replace("\n","").split(",")

language = {}
for line in range(len(data[0])):
    language[data[0][line]] = [i[line] for i in data]

def translate(From, To, Text):
    return language[To][language[From].index(Text)]
