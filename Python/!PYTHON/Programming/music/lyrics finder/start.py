import urllib.request

def find(artist, song, center=True):
    url = "http://www.azlyrics.com/lyrics/" + artist + "/" + song + ".html"
    html = urllib.request.urlopen(url).read()
    start = html.index(b"<!-- Usage of azlyrics.com content")
    end = html.index(b"<!-- MxM banner -->")

    song_html = html[start + 133 : end - 22]
    lyrics = song_html.replace(b"<br>\n<br>",b"\n").replace(b"<br>",b"")
    lyrics = lyrics.replace(b"<i>",b"").replace(b"</i>",b"")

    title = html[html.index(b"<!-- END OF JANGO PLAYER -->") : ]
    title = title[title.index(b"<b>") +3 : title.index(b"</b>")]

    song = (title.upper() + b":\n" + lyrics).decode("utf-8")
    centered = "\n".join([line.center(70) for line in song.split("\n")])

    return [centered if center == True else song][0]

def user():
    artist = input("Song artist: ")
    title = input("Song title: ")
    
    for i in "!£$%^&*()_+1234567890-='\/*-@#~\|. ":
        artist = artist.replace(i,"")
        title = title.replace(i,"")

    print(find(artist.lower(), title.lower()))
