from selenium import webdriver
import time

driver = webdriver.Chrome()

driver.get("https://www.pokemon.com/uk/pokedex/");

# click load more button
time.sleep(2)
driver.execute_script('document.getElementById("loadMore").click();')
time.sleep(2)

# scroll to bottom of page
for i in range(100):
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
    time.sleep(0.1)

# get URLs
func1 = """(function () {
	elms = document.querySelectorAll('[class="results"] [class="animating"] a[href^="/uk/pokedex/"]');
	urls = [];
	for (i=0;i<elms.length;i++) {
		urls.push(elms[0].getAttribute("href"));
	}
	return urls;
})();"""
urls = driver.execute_script("return " + func1);

# get stats for each pokemon
for i in range(len(urls)):
    driver.get("https://www.pokemon.com/" + urls[i])

    #stats
    number = driver.execute_script("""return document.querySelectorAll('[class="pokedex-pokemon-pagination-title"] [class="pokemon-number"]')[0].innerText""")
    name = driver.execute_script("""return document.querySelectorAll('[class="pokedex-pokemon-pagination-title"] div')[0].innerText.split("#")[0]""")
    description_x = driver.execute_script("""return document.querySelectorAll('[class="version-descriptions active"] [class^="version-x"]')[0].innerText""")
    description_y = driver.execute_script("""return document.querySelectorAll('[class="version-descriptions active"] [class^="version-y"]')[0].innerText""")

    # basic stats
    height = driver.execute_script("""return document.querySelectorAll('[class="info match-height-tablet"] [class="attribute-value"]')[0].innerText""")
    weight = driver.execute_script("""return document.querySelectorAll('[class="info match-height-tablet"] [class="attribute-value"]')[1].innerText""")
    gender = driver.execute_script("""return document.querySelectorAll('[class="info match-height-tablet"] [class="attribute-value"]')[2].innerHTML""")
    gender = ", ".join(["Male" if "male" in gender else ""] + ["Female" if "female" in gender else ""])
    category = driver.execute_script("""return document.querySelectorAll('[class="info match-height-tablet"] [class="attribute-value"]')[3].innerText""")
    abilities = driver.execute_script("""return document.querySelectorAll('[class="info match-height-tablet"] [class="attribute-value"]')[4].innerText""")

    # types
    func2 = """(function () {
	elms = document.querySelectorAll('[class="dtm-type"] ul li[class^="background-color"] a[href^="/uk/pokedex/?type="]');
	output = [];
	for (i=0;i<elms.length;i++) {
		output.push(elms[i].innerText);
	}
	return output;
})();"""
    types = list(set(driver.execute_script("return " + func2)));

    # weknesses
    func3 = """(function () {
	elms = document.querySelectorAll('[class="dtm-weaknesses"] ul li[class^="background-color"] a[href^="/uk/pokedex/?weakness="]')
	output = [];
	for (i=0;i<elms.length;i++) {
		output.push(elms[i].innerText);
	}
	return output;
})();"""
    weakness = list(set( [i.replace(" ","").replace("\n","").replace("\t","") for i in driver.execute_script("return " + func3)]))

    # fighting stats
    func4 = """(function () {
	elms = document.querySelectorAll('[class^="pokemon-stats-info active"] ul li[data-value]');
	output = [];
	for (i=0;i<elms.length;i++) {
		output.push(elms[i].getAttribute("data-value"));
	}
	return output;
})();"""
    HP, Attack, Defense, Special_Attack, Special_Defense, Speed = driver.execute_script("return " + func4)

    # write stats to file
    with open("dataset_pokemon.txt", "a") as file:
        file.write((
            "Number:" + number + "|" +\
            "Name:" + name + "|" +\
            "Description_X:" + description_x + "|" +\
            "Description_Y:" + description_y + "|" +\
            "Height:" + height + "|" +\
            "Weight:" + weight + "|" +\
            "Gender:" + gender + "|" +\
            "Category:" + category + "|" +\
            "Abilities:" + abilities + "|" +\
            "Types:" + ", ".join(types) + "|" +\
            "Weakness:" + ", ".join(weakness) + "|" +\
            "HP:" + HP + "|" +\
            "Attack:" + Attack + "|" +\
            "Defense:" + Defense + "|" +\
            "Special Attack:" + Special_Attack + "|" +\
            "Special Defense:" + Special_Defense + "|" +\
            "Speed:" + Speed + "|\n").replace("\n",""))
    print(name + " dataset written to file!")
