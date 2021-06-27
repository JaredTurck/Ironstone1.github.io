from bs4 import BeautifulSoup
import requests

# example xpath
#document.querySelectorAll('div[id="main-body"] div[id="add-bot"] div[class="add-bot-div"] h4')[0]

def xpath(path):
    elms = filter(None, path.split(" "))
    element = soup
    for elm in elms:
        if "[" in elm and "]" in elm:
            # get attributes
            raw = [i.split("]")[0] for i in elm.split("[")]
            tag_name, attributes = raw[0], raw[1:]

            current_elms = []
            for attribute in attributes:
                attribute_name, attribute_value = attribute.split("=")
                attribute_value = attribute_value.replace("'",'').replace('"',"")
                
                if attribute_name == "id":
                    element = element.find(tag_name, id=attribute_value)
                    if element:
                        current_elms.append(element)

                elif attribute_name == "class":
                    element = element.find(tag_name, class_=attribute_value)
                    if element:
                        current_elms.append(element)

            # compare attributes of current element
            # check if the attributes refer to the same element
            if len(set([i.contents[0] for i in current_elms])) != 1:
                return "Failed to find xpath!"
        else:
            element = element.find(elm)     

    return element

# test xpath
source = requests.get("https://jaredbot.uk/").text
soup = BeautifulSoup(source, 'lxml')
elm = xpath('div[id="main-body"] div[id="add-bot"] div[class="add-bot-div"] a[class="button-1"] span')

print(elm.prettify())
print(f"Button text is: {elm.text}")
