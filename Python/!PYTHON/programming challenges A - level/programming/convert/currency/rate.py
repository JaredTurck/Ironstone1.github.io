import urllib.request

def convert(From, To, n):
    api = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20"+\
           "yahoo.finance.xchange%20where%20pair%20in%20(%22" + From + To +\
           "%22)&env=store://datatables.org/alltableswithkeys"

    html = (urllib.request.urlopen(api).read()).decode("utf-8")
    Data = {}

    for i in ["Name", "Rate", "Date", "Time", "Ask", "Bid"]:
        Data[i] = html[html.index("<"+i+">")+len(i)+2 : html.index("</"+i+">")]

    return n * float(Data["Rate"])
