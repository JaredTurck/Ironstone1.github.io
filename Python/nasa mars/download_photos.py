from selenium import webdriver
import urllib.request

script1 = """(function () {
	elms = document.querySelectorAll('[class="raw_images_list"] [class="raw_image_container raw_image_container "] [class="raw_list_image_inner"] a');
	urls = []
	for (i=0;i<elms.length;i++) {
		urls.push(elms[i].getAttribute("data-fancybox-href"));
	}
	return urls
})();"""

driver = webdriver.Chrome("chromedriver.exe")
driver.get('https://mars.nasa.gov/msl/multimedia/raw-images/')

current_page = driver.find_element_by_class_name('page_num').get_attribute('value')
last_page = driver.find_element_by_class_name('total_pages').text
while int(current_page.replace(',','')) < int(last_page.replace(',','')):
    urls = driver.execute_script('return ' + script1)

    for url in urls:
        try:
            # download photo
            file_name = url.split('/')[-1]
            urllib.request.urlretrieve(url, file_name)
            print('[+] Downloaded ' + file_name + '!')
        except:
            # failed to download
            print('[-] Failed to download ' + file_name + '!')

    # load next page
    driver.find_elements_by_class_name('next')[-1].click()
    current_page = driver.find_element_by_class_name('page_num').get_attribute('value')
    last_page = driver.find_element_by_class_name('total_pages').text

    print("loaded page " + current_page + " of " + last_page + "!")
