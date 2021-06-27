import re

text_to_search = """
abcdefghijklmnopqurtuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
1234567890

Ha HaHa

MetaCharacters (Need to be escaped):
. ^ $ * + ? { } [ ] \ | ( )

coreyms.com

321-555-4321
123.555.1234
123*555*1234
800-555-1234
900-555-1234

Mr. Schafer
Mr Smith
Ms Davis
Mrs. Robinson
Mr. T
"""

# raw string doesn't convert backslash to string
# print(r"\n") will print the string '\' and 'n'

# search for the sub string "abc" in the string
# it is case sensitive
print("--- Search for Substring ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern = re.compile(r"wall")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# make sure to escape meta characters
print("--- escape meta chars ---")
str1 = "The cat jumped over the wall. and the catapilla!"
pattern = re.compile(r"\.")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# search for url
print("--- search for URL ---")
str1 = "The cat jumped over https://google.com. and the catapilla!"
pattern = re.compile(r"cgoogle\.com")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# meta character meanings
# .         - any character except new line
# \d        - digit 0-9
# \D        - not a digit 0-9
# \w        - word character (a-z, A-Z, 0-9, _)
# \W        - not a word character
# \s        - whitespaces (space, tab, newline)
# \S        - Not whitespace (space, tab, newline)

# \b        - word boundary
# \B        - not a word boundary
# ^         - beginning of a string
# $         - matches end of string

# . means any character except new line
print("--- Search all chars except new line ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern = re.compile(r".")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# \d any digits 0-9
print("--- Search only digits ---")
str1 = "The cat jumped over the wall 23 times in 5 seconds, and the catapilla!"
pattern = re.compile(r"\d")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# \D anything that is not a digit
print("--- Search anything that is not a digit ---")
str1 = "The cat jumped over the wall 23 times in 5 seconds, and the catapilla!"
pattern = re.compile(r"\D")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# \w means word character
# anything that is a lowercase letter, uppercase letter
# a digit, or underscore
print("--- Search anything that is a digit, letter or underscore ---")
str1 = "The cat jumped over the wall 23 times in 5 seconds, and the catapilla!"
pattern = re.compile(r"\w")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# \W means not a word character
# anything that is not a letter, digit ot underscore
print("--- Search anything that is a not a digit, letter or underscore ---")
str1 = "The cat jumped over the wall 23 times in 5 seconds, and the catapilla!"
pattern = re.compile(r"\W")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# \s any white space
print("--- Search anything that is a space, tab or new line ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern = re.compile(r"\s")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# \S anything that is not a space, tab or new line
print("--- Search anything that is a space, tab or new line ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern = re.compile(r"\S")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# \b        - word boundary
# \B        - not a word boundary
# ^         - beginning of a string
# $         - matches end of string

# \b word boundary
# returns the start of any word that starts with the specificed substring
print("--- Search for a specific start of word ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern = re.compile(r"\bwa")
matches = pattern.finditer(str1)
[print(i) for i in matches]

# the index of "cat" and "catapilla" are returned
# becuase they both start with "ca"
str1 = "The cat jumped over the wall, and the catapilla!"
pattern1 = re.compile(r"\bca")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# return any index that matches the end of the word
# wall end with "all" so the index of all is returned
print("--- Search for a specific end of word ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern1 = re.compile(r"\Ball")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# ^ match beginning of string
print("--- match beginning of string ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern1 = re.compile(r"^The cat")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# $ match end of string
print("--- match end of string ---")
str1 = "The cat jumped over the wall, and the catapilla!"
pattern1 = re.compile(r"illa!$")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# get match that is 3 digits
print("--- match that is 3 digits ---")
str1 = "my phone number is 234-5555-674 phone me!"
pattern1 = re.compile(r"\d\d\d")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# match the pattern DDD.DDDD.DDD
print("--- match the phone number pattern ---")
str1 = "my phone number is 234-5555-674 phone me!"
pattern1 = re.compile(r"\d\d\d.\d\d\d\d.\d\d\d")
matches = pattern1.finditer(str1)
[print(i) for i in matches]
# \d\d\d.\d\d\d\d.\d\d\d
# dot means any character except new line

# match the pattern DDD-DDDD-DDD
# but with only specific seperator characters e.g. - or .
print("--- match the phone number pattern with seperator -. ---")
str1 = "my phone number is 234-5555-674 phone me!"
pattern1 = re.compile(r"\d\d\d[-.]\d\d\d\d[-.]\d\d\d")
matches = pattern1.finditer(str1)
[print(i) for i in matches]
# [-.] means match either - or .

# only match 800 and 700 numbers
print("--- match 800 and 700 numbers ---")
str1 = "old number 900-5467-764 new number is 800-4934-356 and 700-2342-233"
pattern1 = re.compile(r"[78]00[-.]\d\d\d\d[-.]\d\d\d")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# single chracter matching
# [a-z] match lower case letters
# [a-zA-Z] match lower and uppercase letters

# [^a-zA-Z] match everything that is not a upper and lowercase letter

# [^c] match all characters that is not a c

# on it's own ^ means matches start of string
# inside of brackets [] it means NOT

# Quantifiers
# *     match 0 or more
# +     match 1 or more
# ?     match 0 or 1 (optional)
# {3}   exact number
# {3,4} exact range (min, max)

# only match 800 and 700 numbers
print("--- match 800 and 700 numbers ---")
str1 = "old number 900-5467-764 new number is 800-4934-356 and 700-2342-233"
pattern1 = re.compile(r"[78]00[-.]\d{4}[-.]\d{3}")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# ? mark means match 0 or 1 of our specified characters
# allows you to say that characters are optional
print("--- optional match ---")
str1 = "Mr. Tom and Mr Jerry went to the shop!"
pattern1 = re.compile(r"Mr\.?")
matches = pattern1.finditer(str1)
[print(i) for i in matches]
# Mr\.? means the '.' is optional

# + means match 1 or more of the condition
print("--- 1 or more match ---")
str1 = "Mr. Tom and Mr Jerry went to the shop!"
pattern1 = re.compile(r"Mr\.? \w+")
matches = pattern1.finditer(str1)
[print(i) for i in matches]
# \w+ means match 1 or more characters of \w our word character rule

# * means match 0 or more of the condition
print("--- 0 or more match ---")
str1 = "Mr. Tom and Mr Jerry went to the shop!"
pattern1 = re.compile(r"Mr\.? \w*")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# []    match characters in brackets
# ()    means group
# |     means either or

# | means or
print("--- or match ---")
str1 = "Mr. Tom and Mr Jerry went to the shop!"
pattern1 = re.compile(r"(Mr.|Mr) \w+")
matches = pattern1.finditer(str1)
[print(i) for i in matches]

# Emails match
print("--- emails test ---")
emails = """
JaredTurck@gmail.com
jared.turck@university.edu
jared-6969-turck@my-work.net
"""
pattern1 = re.compile(r"[\w.-]+@[\w.-]+")
matches = pattern1.finditer(emails)
[print(i) for i in matches]

# URLs test
print("--- urls test ---")
urls = """
https://www.google.com
http://coreyms.com
https://youtube.com
https://www.nasa.gov
"""
pattern1 = re.compile(r"https?://\w+.[\w.]+")
matches = pattern1.finditer(urls)
[print(i) for i in matches]

# only get domain name from URL
print("--- match domains ---")
pattern1 = re.compile(r"https?://(w+\.)?(\w+)(\.\w+)")
matches = pattern1.sub(r"\2\3", urls)
print(matches)

# sub lets you select specific groups
# "\2\3" means only select group 2 and 3

# finditer  - returns an object you can iterate through
# findall   - returns a list of matches
# sub       - select specific groups and discard the others
# match     - returns the first match start from beginning of string
# search    - returns first match starting from anywhere in string
