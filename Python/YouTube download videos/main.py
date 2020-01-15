import pytube, urllib.request, time

def download_all(playlist):
    failed_to_download = []

    for vid_url in playlist:
        url_short = str(vid_url.split("youtube.com/watch?v=")[1].split("&")[0])
        try:
            pytube.YouTube(vid_url).streams.first().download()
            print("downloaded '" + url_short + "'!")
        
        except:
            failed_to_download.append(vid_url)
            print("failed to download '" + url_short + "'!")

    return failed_to_download



# enter youtube url
playlist_url = input("Please paste YouTube playlist URL: ")
while ("https://www.youtube.com/" not in playlist_url):
    playlist_url = input("Invalid Input! Thats not a YouTube playlist URL\nenter url > ")
print("Downloading videos please wait!")

# get HTML
html = urllib.request.urlopen(playlist_url).read();
playlist = list(set(["youtube.com/watch?v="+(i.split(b'"')[0].decode("utf-8")) for i in html.split(b'href="/watch?v=')][1:-1]))

# download each video
left = playlist
while left != []:
    left = download_all(left)
        
print("Finished downloading!")
