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

def write_html(html):
    with open("output.html", "wb") as file:
        file.write(html)

def remove_tags(html):
    parts = []
    for i in html.split(b'<'):
        c = i.split(b'>')
        if len(c) > 1:
            parts.append(c[1])
        else:
            parts.append(c[0])
    return b"".join(parts).decode("UTF-8")

def parse_html(html):
    # check for captcha
    if b'Our systems have detected unusual traffic from your computer network.' in html:
        print("[-] Google has blocked the request and sent a captcha!")
        raise AssertionError("Google Blocked request!")
    
    # layout 1
    try:
        # remove tags from text
        txt = html.split(b'id="main"')[1].split(b'<!--SW_C_X-->')[1].split(b'class="kCrYT"')[2].split(b'class="BNeawe')[2]
        txt = remove_tags(txt)

        # get website URL
        url = html.split(b'id="main"')[1].split(b'<!--SW_C_X-->')[1].split(b'class="kCrYT"')[1]
        url = b'https://' + url.split(b'a href="')[1].split(b'"')[0].replace(b'http://', b'https://').split(b'https://')[1]
        if b'https://' in url:
            url = b'https://' + url.split(b'https://')[1]

    # layout 2
    except IndexError:
        # remove tags from text
        txt = html.split(b'id="main"')[1].split(b'<!--SW_C_X-->')[1].split(b'class="kCrYT"')[1]
        txt = remove_tags(txt)

        # get website URL
        url = html.split(b'id="main"')[1].split(b'<!--SW_C_X-->')[1].split(b'class="kCrYT"')[2]
        url = b'https://' + url.split(b'a href="')[1].split(b'"')[0].replace(b'http://', b'https://').split(b'https://')[1]
        if b'https://' in url:
            url = b'https://' + url.split(b'https://')[1]

    # return
    return [url, txt]

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

# break text up into fixed sized chunks
def split_by_fixed_chunks(data, chunk_size=32):
    word_chunks = []
    words = data.split(" ")
    for i in range(0, len(words), chunk_size):
        word_chunks.append(" ".join(words[i:i+chunk_size]).replace('"', ''))
        
    return word_chunks

# break text up into sentences
def split_by_sentences(data, chunk_size=32):
    word_chunks = []
    sentences = data.split(".")
    sentence_count = 0
    while sentence_count < len(sentences):
        # loop until chunk contains at least chunk_size characters
        current_chunk = sentences[sentence_count]
        while len(current_chunk.split(" ")) < chunk_size:
            sentence_count += 1
            if sentence_count < len(sentences):
                current_chunk += ("." + sentences[sentence_count])
            elif sentence_count > len(sentences):
                if len(current_chunk.split(" ")) > 10:
                    word_chunks.append(current_chunk)
                break

        # append chunk
        if len(current_chunk.split(" ")) > 10:
            word_chunks.append(current_chunk)
            
        sentence_count += 1

    return word_chunks

word_chunks = split_by_fixed_chunks(data)

# query google
results = {}
for i,chunk in enumerate(word_chunks):
    current_result = google.search('"'+chunk+'"')

    # get text from html
    try:
        url, google_text = parse_html(current_result)
        results[i] = [url, google_text, chunk]
        pcnt = round(((i+1)/len(word_chunks))*100, 2)
        print(f"[+] Processed {i+1} of {len(word_chunks)} queries {pcnt}% Complete!")
    except AssertionError:
        break

# how many of the user words match to google result words
for i in results.keys():
    # process chunk
    in_result_counter = 0
    last_order = 0
    order_counter = 0
    
    words_2_check = results[i][2].split(" ")
    for o,word in enumerate(words_2_check):
        # check if word in result
        if word.lower() in results[i][1].lower():
            in_result_counter += 1
            
            # check order
            if o > last_order:
                order_counter += 1
                last_order = o

    # calc percent for chunk
    in_percent = (in_result_counter / len(words_2_check))*100
    order_percent = ((order_counter+1) / len(words_2_check))*100
    results[i].append([in_percent, order_percent])
    print([in_percent, order_percent])

# calculate final percent
if len(results.keys()) > 0:
    final_percent = sum([sum(results[i][3]) for i in results.keys()]) / (len(results.keys())*2)
    print(final_percent)
