f = open("hundreds.csv").readlines()
num = dict([i.replace("\n","").split(",") for i in f])
num["0"], num["00"], num["000"], num["0000"] = ("", "", "", "")

def convert(n):
    n = "%04d" % n
    return num[n[0]+"000"] + num[n[1]+"00"] + num[n[2]+"0"] + num[n[3]]
