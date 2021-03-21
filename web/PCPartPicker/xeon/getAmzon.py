from selenium import webdriver

driver = webdriver.Chrome("chromedriver.exe")
driver.get("https://www.amazon.co.uk/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=CPU")

driver.execute_script('output = "";results = document.getElementById("s-results-list-atf").children;for (i=0;i<results.length;i++) {next = results[i].getElementsByClassName("a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal")[0].href;output += "\n" + next} console.log(output);')

"""
output = "";
results = document.getElementById("s-results-list-atf").children;
for (i=0;i<results.length;i++) {
	next = results[i].getElementsByClassName("a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal")[0].href;
	output += "\n" + next
} console.log(output);
"""
