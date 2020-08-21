from selenium import webdriver

driver = webdriver.Chrome("chromedriver.exe")
url = "https://steamcommunity.com/id/JaredCat/myworkshopfiles/?p="
url2 = "https://steamcommunity.com/sharedfiles/filedetails/?id="
filter_1 = '//div[@class="workshopItem"]//a[contains(@href, "{url}")][@data-appid="730"]'
filter_2 = '//div[@class="workshopBrowsePagingControls"]//a[@class="pagelink"]'

def get_data():
    urls = []
    def get_elms(pnum, search_text):
        driver.get(url + str(pnum))
        return [i.get_attribute("href") for i in driver.find_elements_by_xpath(search_text.replace("{url}", url2))]

    last_page = int(get_elms(1, filter_2)[-1].split("/?p=")[1])

    for page_num in range(last_page +1):
        urls += get_elms(page_num, filter_1)

    return list(set(urls))

def gen_dict():
    data = {}
    url_list = get_data()
    for i in range(len(url_list)):
        driver.get(url_list[i])

        table = driver.find_elements_by_xpath('//table[@class="stats_table"]//tbody//tr')
        data[i] = [item.text.split(" ", 1)[::-1] for item in table]
        
    return data

def get_total():
    data = gen_dict()
    counts = [0,0,0]

    for key in data.keys():
        for i in range(3):
            try:
                counts[i] += int(data[key][i][1].replace(",", ""))
            except:
                print("error")

    return counts

get_data()
input("press enter to continue...")


