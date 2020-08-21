from urllib import request
import time, datetime

url = "https://www.worldometers.info/coronavirus/"
html = request.urlopen(request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode("utf-8")

def GetStat(FindBy, FindBy2='<span>', html=""):
    elm1 = html.split(FindBy)[1]
    elm2 = elm1.split('<div class="maincounter-number"')[1]
    elm3 = elm2.split(FindBy2)[1]
    
    return elm3.split("</span>")[0].replace(" ","")

def writePrint(text, text2=""):
    with open("cases.log", "a+") as file:
        file.write(text + text2 + "\n")
        print(text + text2)

cases = GetStat('<h1>Coronavirus Cases:</h1>', '<span style="color:#aaa">', html=html)
deaths = GetStat('<h1>Deaths:</h1>', html=html)
recovered = GetStat('<h1>Recovered:</h1>', html=html)

while True:
    html = request.urlopen(request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode("utf-8")
    
    cases_new = GetStat('<h1>Coronavirus Cases:</h1>', '<span style="color:#aaa">', html=html)
    deaths_new = GetStat('<h1>Deaths:</h1>', html=html)
    recovered_new = GetStat('<h1>Recovered:</h1>', html=html)

    if cases_new != cases:
        ct = datetime.datetime.now()
        ct_format = ct.day, ct.month, ct.year, str(ct.hour)+":"+str(ct.minute)+":"+str(ct.second)
        
        writePrint("")
        writePrint("[+] Stats Updated! -", str(ct_format))
        writePrint("Cases:", str(cases))
        writePrint("Deaths:", str(deaths))
        writePrint("Recovered:", str(recovered))

        cases = str(cases_new)
        deaths = str(deaths_new)
        recovered = str(recovered_new)
        

    time.sleep(10)
