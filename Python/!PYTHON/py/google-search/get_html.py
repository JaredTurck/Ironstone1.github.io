from google_search import google_search
import os

def process():
    url = input("url: ")
    if "http" not in url:
        url = "https://" + url

    if "." not in url:
        print("Invalid URL!")
        return None

    req = google_search()
    req.url = url
    req.search("")
    print(f"[+] Downloaded {url}")

    with open("output.html") as file:
        file.write(req.html)

#process()
#os.popen('explorer.exe "' + os.path.dirname(os.path.realpath(__file__)) + '"')
