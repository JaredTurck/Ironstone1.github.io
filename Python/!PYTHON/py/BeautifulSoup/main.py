from bs4 import BeautifulSoup
import requests

# opens a html file and parses it using lxml parser
with open("simple.html") as file:
    soup = BeautifulSoup(file, 'lxml')

# prints the html
# prettify() adds tabs/indents to make the html look nicer
print(soup.prettify())

print(soup.title) # you can access any tag just simply by using a dot
print(soup.head.title) # also prints the title
print(soup.div.h2.a) # prints the link in first div

print(soup.jared) # you can also access custom tags

print(soup.title.text) # .text only shows the text of an element

# find all div tags with the class footer
print(soup.find("div", class_="footer"))
print(soup.body.find("div", class_="footer"))

article = soup.find("div", class_="article")
print(article.h2.a.text)

# returns a list of all the div tags with the class article
articles = soup.find_all("div", class_="article")

# parse jaredbot.uk website
source = requests.get("https://jaredbot.uk/").text
soup = BeautifulSoup(source, 'lxml')

print(soup.prettify())

# print the bot description on jaredbot.uk website
print(soup.find("div", id="main-body").find_all("div")[2].h4.text)
