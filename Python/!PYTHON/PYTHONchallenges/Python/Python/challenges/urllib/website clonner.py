import urllib.request, re
user = input("Enter yout website url: ")
html = (urllib.request.urlopen(user))
html = html.read().decode(html.headers.get_content_charset())
open("web\Index.html","w").write(html)

urls = re.findall((open("Search.txt").read()),html)

for i in range(len(urls)):
    try:
        html = (urllib.request.urlopen(urls[i]))
        html = html.read().decode(html.headers.get_content_charset())
        if ".php" in urls[i]:
            open("web\Webpage_"+str(i)+".php","w").write(html)
        elif ".css" in urls[i]:
            open("web\webpage+"+str(i)+".css","w").write(html)
        elif ".jpg" in urls[i]:
            urllib.urlretrive(urls[i],"jpg_image_"+str(i)+".jpg")
        else:
            open("web\webpage_"+str(i)+".html","w").write(html)
    except:
        pass
