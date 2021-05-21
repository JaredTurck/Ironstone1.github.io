from google_search import google_search

google = google_search()

# get text
def input_multi_line(txt=""):
    data = []
    p1, p2 = ".", "."
    if len(txt) > 1:
        print(txt, end="")
        
    while len(p1 + p2) > 0:
        p1 = input()
        p2 = input()
        data.append(f"{p1}\n{p2}")
    return "\n".join(data)[:-2]

raw_data = input_multi_line("Enter Text: ")

# remove all non printable characters from text
allow_chars = ["\n", "\t"]
data_chrs = []
for i in range(len(raw_data)):
    if raw_data[i].isprintable() == True:
        data_chrs.append(raw_data[i])
    elif raw_data[i] in allow_chars:
        data_chrs.append(raw_data[i])
        
data = "".join(data_chrs)

# search each paragrph of text in google
paragraphs = list(set(filter(None, data.split("\n"))))

html = google.search(paragraphs[0])

# compare how similar search results are with user text
