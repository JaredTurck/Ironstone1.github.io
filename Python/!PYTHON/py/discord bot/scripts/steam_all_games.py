import requests
from selenium import webdriver

url = "https://steamcommunity.com/id/JaredCat"
steam_db_url = "https://steamdb.info/app"

get_elms = """(function get_id(){
	elms = document.querySelectorAll('[id^="game_"]');
	ids = [];
	for (i=0;i<elms.length;i++) {
		ids.push(elms[i].getAttribute("id").replace("game_",""));
	}
	return ids;
})();"""

# get game IDs
driver = webdriver.Chrome("chromedriver.exe")
driver.get(url + "/games/?tab=all")
ids = driver.execute_script("return " + get_elms)


#html = requests.get(url + "/games/?tab=all").text.encode("utf-8")

#with open("file1.html", "w") as file:
#    file.write(str(html))

for Id in ids:
    html = requests.get(steam_db_url +"/"+ Id).text.encode("utf-8").decode("utf-8")
