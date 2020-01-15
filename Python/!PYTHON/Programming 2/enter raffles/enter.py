from selenium.webdriver.support import expected_conditions
from selenium import webdriver
import selenium

def wait4elem(attr, elem):
    webdriver.support.ui.WebDriverWait(driver, 3).until(expected_conditions.presence_of_element_located((
        getattr(selenium.webdriver.common.by.By, attr), elem)))

options = webdriver.chrome.options.Options()
options.add_argument(r'--user-data-dir=C:\Users\STEAM\AppData\Local\Google\Chrome\User Data')
options.add_argument('--profile-directory=Default')
driver = webdriver.Chrome("chromedriver.exe", chrome_options=options)

driver.get("https://scrap.tf/raffles")
while driver.execute_script("""return $("div[class='panel-body pag-done pag-loading']")[0].innerHTML != "That's all, no more!\""""):
    driver.execute_script("scrollTo(0, document.body.scrollHeight);")

raffles = driver.execute_script("""return $("div[id^='raffle-box-'][style=''] a[href^='/raffles/']").map(function() {return this.href;});""")
for raffle in raffles:
    driver.get(raffle)
    driver.execute_script("""$("button[id='raffle-enter'][onclick^='ScrapTF.Raffles.EnterRaffle']")[0].click()""")
    wait4elem("XPATH", "//button[@id='raffle-enter'][@data-loading-text='Leaving...']")
    

    if driver.execute_script("""return $('button[onclick^="ScrapTF.Raffles.WithdrawRaffle"]')[0] != undefined"""):
        driver.execute_script("ScrapTF.Raffles.WithdrawRaffle('" + raffle.split("/")[-1] + "')")
        wait4elem("XPATH", "//button[@onclick='ScrapTF.TradeOffers.Run()']")
        driver.execute_script("ScrapTF.TradeOffers.Run();")
        driver.switch_to_window(driver.window_handles[1])
        wait4elem("XPATH", "//div[@id='you_notready']")
        driver.execute_script("ToggleReady( true );")
        
        if driver.execute_script("""return $("div[class='btn_green_white_innerfade btn_medium']") != undefined"""):
            driver.execute_script('document.getElementsByClassName("btn_green_white_innerfade btn_medium")[0].click();')
        
        wait4elem("XPATH", "//div[@id='trade_confirmbtn']")
        driver.execute_script('document.getElementById("trade_confirmbtn").click();')
        wait4elem("XPATH", "//div[@id='close_window_btn']")
        driver.execute_script('window.close();')
        

driver.get("https://scrap.tf/raffles")
driver.quit()

#$('button[onclick^="ScrapTF.Raffles.WithdrawRaffle"]')[0]
#$('button[id="raffle-enter"][onclick^="ScrapTF.Raffles.LeaveRaffle"]')[0]
