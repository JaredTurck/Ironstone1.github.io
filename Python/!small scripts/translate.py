import urllib.request, urllib.parse, json

url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=eng&dt=t&q="
text = input("text: ")

reponse = urllib.request.urlopen(url + urllib.parse.quote(text))
result = json.loads(reponse.read())[0][0][0]
print(result)

# single line of code
# (lambda m1, m2, m3 : m3.loads(m1.request.urlopen("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=eng&dt=t&q="+m2.parse.quote(input("text: "))).read())[0][0][0])(__import__("urllib.request"), __import__("urllib.parse"), __import__("json"))
