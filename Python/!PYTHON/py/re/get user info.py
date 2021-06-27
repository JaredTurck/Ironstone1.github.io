import re

txt = open("data.txt", "r").read()

# get list of all phone numbers
print(re.compile(r"\d+-\d+-\d+").findall(txt))

# get list of all 800 phone numbers
print(re.compile(r"800-\d+-\d+").findall(txt))

# get list of all 500-700 numbers
print(re.compile(r"[5-7]\d\d-\d+-\d+").findall(txt))

# get list of all addresess
print(re.compile(r"\d+ [\w ]+., [\w ]+").findall(txt))

# get list of all street names
print([i[1] for i in re.compile(r"(\d+ )([\w ]+St.)(, \w+)").findall(txt)])

# get list of all town names
print([i[1] for i in re.compile(r"(\d+ [\w+ ]+., )(\w+)").findall(txt)])

# get list of all post codes
print([i[1] for i in re.compile(r"(\d+ [\w+ ]+., \w+[\w+ ]\w+ )(\d+)").findall(txt)])

# get list of all emails
print(re.compile(r"\w+@\w+\.\w+").findall(txt))

# get list of all email domains
print([i[1] for i in re.compile(r"(\w+@)(\w+\.\w+)").findall(txt)])

# get list of all root domains
print([i[1] for i in re.compile(r"(\w+@\w+\.)(\w+)").findall(txt)])

# get list of all email names before @
print([i[0] for i in re.compile(r"(\w+)(@\w+\.\w+)").findall(txt)])

# get list of all names
print([i[0] for i in re.compile(r"([A-Z]\w+ [A-Z]\w+)(\n)").findall(txt)])

# get list of all first names
print([i[0] for i in re.compile(r"([A-Z]\w+)( [A-Z]\w+\n)").findall(txt)])

# get list of all surnames
print([i[1] for i in re.compile(r"([A-Z]\w+ )([A-Z]\w+)\n").findall(txt)])
