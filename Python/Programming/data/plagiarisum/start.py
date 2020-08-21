from urllib.request import urlopen, Request

found = {}
chars = ["...","…",":","\n"]
text = input("Paste text below:\n")
print("Searching the web...")

paragraph = [text.replace(i,"") for i in chars][0].split(".")
search = ["http://www.bing.com/search?q=",
          "http://www.google.com/search?q="]

for engine in search:
    for sentence in paragraph:
        try:
            url = engine +"'"+ sentence.replace(" ","%20") +"'"

            req = Request(url, headers={"User-Agent" : "Mozilla/5.0"})
            html = (urlopen(req).read()).decode("utf-8")

            if sentence in html:
                found[sentence] = [html.count(sentence),url]
        except:
            pass

print("\n\nFound the following:")
for item in found:
    print("-"*60)
    print("Search Term: ", item)
    print("Matchs found: ", found[item][0])
    print("source: ", found[item][1],"\n")
