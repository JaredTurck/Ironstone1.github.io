import re

txt = """
the cat is 25 feet tall and weighs 45kg.

https://google.com

"""

print(re.compile("cat").findall(txt)) # exact match
print(re.compile(".").findall(txt)) # all characters apart from new line, space, and tab

print(re.compile("https://google\.com").findall(txt)) # \. means escape . literal char

print(re.compile("\d").findall(txt)) # match any digit
print(re.compile("\D").findall(txt)) # not a digit

print(re.compile("\w").findall(txt)) # word character [a-zA-Z0-9]
print(re.compile("\W").findall(txt)) # not a word character

print(re.compile("\s").findall(txt)) # match spaces, newline
print(re.compile("\S").findall(txt)) # not a space

print(re.compile("\bca").findall(txt)) # word boundary (match beginning of word)
print(re.compile("\Bat").findall(txt)) # not word boundary (match end of word)

print(re.compile("[^a]").findall(txt)) # matchs chars not in brackets
