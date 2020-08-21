import selenium
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException



hotwireF = "https://www.hotwire.com/hotels/results/"

# data to be changed accordingly...
data = {"destination"   :   "London",
        "startDate"     :   "09-08-2017",
        "endDate"       :   "09-09-2017",
        "No. rooms"     :   "1",
        "No. Adults"    :   "2",
        "No. Children"  :   "1"}

# Use Safari to open URL
driver = webdriver.Chrome()
# go to URL
driver.get(hotwireF + "".join([data[i]+"/" for i in data]))

#from selenium.webdriver.common.keys import Keys
#driver.get("https://www.hotwire.com/shop/?gccid=")

#for item in data:
#    elem = driver.find_element_by_id(item)
#    elem.send_keys(data[item] + Keys.TAB)

#driver.find_element_by_xpath('//div[@id="rooms"]/span[@class="btn-plus"]').click()

#https://www.hotwire.com/hotels/results/London/04-19-2017/04-20-2017/2/3/0
#https://www.hotwire.com/hotels/results/<destination>/<start Date>/<end Date>/<# Rooms>/<# Adults>/<# Children>
