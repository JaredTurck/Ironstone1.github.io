unit = {0:"", 1:"one", 2:"two", 3:"three", 4:"four", 5:"five", 6:"six",
         7:"seven", 8:"eight", 9:"nine"}

teen = {"1":"ten", "1one":"eleven", "1two":"twelve","1three":"thirteen",
        "1four":"fourteen", "1five":"fifteen","1six":"sixteen",
        "1seven":"seventeen", "1eight":"eighteen","1nine":"nineteen"}

ten = {0:"", 1:"1", 2:"twenty", 3:"thitry", 4:"fourty", 5:"fifty", 6:"sixty",
       7:"seventy", 8:"eighty", 9:"ninty"}

def hundred(num):
    n = list("%03d" % num)
    n = [unit[int(n[0])], ten[int(n[1])], unit[int(n[2])]]
    n = [[n[0], teen[n[1]+n[2]], ""] if n[1] == "1" else n][0]
    n = [[n[0], "hundred", ""] if n[1]+n[2] == "" else n][0]
    if num >= 100 and n[1] != "hundred":
        n = [n[0], "hundred and", n[1], n[2]]

    return  " ".join([i for i in n if i != ""])
