import urllib.request

url = "https://steamladder.com/profile/76561198184802503/"
req = urllib.request.Request(url, data=None, headers={
    "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    })

html = urllib.request.urlopen(req).read()

with open("current.html", "wb") as file:
    file.write(html);

html = html.decode("utf-8").replace(" ", "")

game_badge_url = "https://static.steamladder.com/static/img/game_collector/";
avatar_url = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/";

# user stats
game_badge = game_badge_url + html.split('src="'+game_badge_url)[1].split(">")[0]
games = html.split('class="game-text-stats"')[1].split("</div>")[0]
name = html.split('<divclass="long-name"itemprop="name">')[1].split("</div>")[0];
