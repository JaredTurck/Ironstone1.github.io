from selenium import webdriver

driver = webdriver.Chrome("chromedriver.exe")

"""
driver.get("https://www.amazon.co.uk/s/s/ref=sr_nr_p_89_0?fst=as%3Aoff&rh=n%3A340831031%2Ck%3ACPU%2Cp_89%3AIntel&keywords=CPU&ie=UTF8&qid=1508756055&rnid=1632651031")

output = []

pageNum = 0
pageCount = int(driver.execute_script('return document.getElementsByClassName("pagnDisabled")[0].innerHTML'))

while pageNum < pageCount:
    ItemCount = driver.execute_script('return document.getElementById("s-results-list-atf").children.length;')
    for i in range(ItemCount):
        item = driver.execute_script('return document.getElementById("s-results-list-atf").getElementsByClassName("a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal")['+str(i)+'].href')
        output.append(item)

    driver.find_element_by_id("pagnNextString").click()
    pageNum += 1
"""

output = open("output.txt", "r").read().split("\n")

driver.get("https://uk.pcpartpicker.com/list/")

for i in range(len(output)):
    driver.find_element_by_id("add_custom").click()
    form = driver.execute_script('form = document.getElementById("upp_add_custom_form").children;return form;')
    driver.execute_script("form[0].value = '" + output[i] + "'")

    while True:
        try:
            form[1].click()
            break
        except:
            pass
