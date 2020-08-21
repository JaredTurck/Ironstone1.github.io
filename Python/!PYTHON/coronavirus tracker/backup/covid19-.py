from urllib import request
import time, datetime

html = request.urlopen("https://www.worldometers.info/coronavirus/").read()
html = html.decode("utf-8")

def GetStat(FindBy, FindBy2='<span>'):
    elm1 = html.split(FindBy)[1]
    elm2 = elm1.split('<div class="maincounter-number"')[1]
    elm3 = elm2.split(FindBy2)[1]
    
    return elm3.split("</span>")[0].replace(" ","")

def writePrint(text):
    with open("cases.log", "a+") as file:
        file.write(text + "\n")

cases = GetStat('<h1>Coronavirus Cases:</h1>',
                '<span style="color:#aaa">')
deaths = GetStat('<h1>Deaths:</h1>')
recovered = GetStat('<h1>Recovered:</h1>')

while True:
    cases_new = GetStat('<h1>Coronavirus Cases:</h1>',
                        '<span style="color:#aaa">')
    deaths_new = GetStat('<h1>Deaths:</h1>')
    recovered_new = GetStat('<h1>Recovered:</h1>')

    if cases_new != cases:
        ct = datetime.datetime.now()
        ct_format = ct.day, ct.month, ct.year,
            str(ct.hour)+":"+str(ct.minute)+":"+str(ct.second)

        writePrint("")
        writePrint("[+] Stats Updated! -", ct_format)
        writePrint("Cases:", cases)
        writePrint("Deaths:", deaths)
        writePrint("Recovered:", recovered)

    time.sleep(5)
