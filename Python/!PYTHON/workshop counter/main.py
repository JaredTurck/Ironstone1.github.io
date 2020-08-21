from selenium import webdriver
import math, time, datetime

url1 = "https://steamcommunity.com/id/JaredCat/myworkshopfiles/?p=1&numperpage=30"
url2 = "https://steamcommunity.com/sharedfiles/filedetails/?id="
urls = []
stats = {}

driver = webdriver.Chrome("chromedriver.exe")
driver.get(url1)

def get_workshop_urls():
    workshop_urls = []

    for i in driver.find_elements_by_xpath('//div[@class="workshopBrowseRow"]//a[contains(@href, "'+url2+'")]//div'):
        current = i.get_attribute("id").replace("sharedfile_", "")
        if current != "":
            workshop_urls.append(current)

    return workshop_urls

def export_data_to_log():
    fname = datetime.datetime.today().strftime("%Y_%m_%d_%H%M%S.log")
    data = " <--- Workshop Stats ---> \n"

    for current_ID in urls:
        data += ('\nID\t' + str(current_ID) + "\n")
        data += ('Unique Visitors:\t' + str(stats[current_ID]['Unique Visitors']) + "\n")
        data += ('Current Subscribers:\t' + str(stats[current_ID]['Current Subscribers']) + "\n")
        data += ('Current Favorites:\t' + str(stats[current_ID]['Current Favorites']) + "\n")

    data += '\nTotal Unique Visitors:\t' + str(Visitors)
    data += '\nTotal Current Subscribers:\t' + str(Subscribers)
    data += '\nCurrent Favorites:\t' + str(Favorites)

    with open(fname, "w") as log_file:
        log_file.write(data)
        

info = driver.find_element_by_xpath('//div[@class="workshopBrowsePagingInfo"]').get_attribute("innerText")
no_pages = int(math.ceil(int(info.split(" of ")[1].split(" ")[0]) / 30))

for i in range(no_pages):
    driver.get(url1.replace("/?p=1", "/?p="+str(int(i)+1)))
    urls += get_workshop_urls()
    time.sleep(5)

for ii in range(len(urls)):
    driver.get(url2 + urls[ii])

    # get table stats
    stats_current_dict = {}
    
    table = driver.find_elements_by_xpath('//table[@class="stats_table"]//tbody//tr')
    for current_one in range(len(table)):
        stat = [i.split("</td>")[0] for i in table[current_one].get_attribute("innerHTML").split("<td>")][:0:-1]
        stats_current_dict[stat[0]] = stat[1]

    stats[urls[ii]] = stats_current_dict

# print total stats
Visitors = 0
Subscribers = 0
Favorites = 0

for current_ID in urls:
    Visitors += int(stats[current_ID]['Unique Visitors'].replace(",", ""))
    Subscribers += int(stats[current_ID]['Current Subscribers'].replace(",", ""))
    Favorites += int(stats[current_ID]['Current Favorites'].replace(",", ""))

print("Totals:\nUnique Visitors\t", Visitors, "\nCurrent Subscribers\t", Subscribers, "\nCurrent Favorites\t", Favorites)
export_data_to_log()
driver.quit()
