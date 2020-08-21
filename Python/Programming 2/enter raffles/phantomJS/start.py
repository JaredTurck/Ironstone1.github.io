from selenium import webdriver
import selenium, pickle

driver = webdriver.PhantomJS("phantomjs.exe")

print("Loading cookies...")
driver.get("https://scrap.tf/raffles")
for cookie in pickle.load(open("Cookies", "rb")):
    try: driver.add_cookie(cookie)
    except: pass
driver.refresh()

print("Loading all raffles...")
while driver.execute_script('''return $("div[class='panel-body pag-done pag-loading']")[0].innerHTML != "That's all, no more!";'''):
    driver.execute_script("scrollTo(0, document.body.scrollHeight);")

print("Entering open raffles...")
raffles = driver.execute_script("""return $("div[id^='raffle-box-'][style=''] a[href^='/raffles/']").map(function() {return this.href;});""")
for raffle in raffles:
    driver.get(raffle)
    try:
        driver.execute_script("""$("button[id='raffle-enter'][onclick^='ScrapTF.Raffles.EnterRaffle']")[0].click();""")
        while driver.execute_script('''return $("button[onclick^='ScrapTF.Raffles.EnterRaffle']")[0] != undefined;'''): pass
    except: pass
    print("'"+raffle+"' Entered Raffle!")

print("Finished Entering Raffles...")
driver.get("https://scrap.tf/raffles")
driver.quit()
