#import socket

#def recv(s):
#    data = "";
#    while "\n\r\n\r" not in data:
#        data += s.recv(1024)
#    return data

#s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#s.connect(("www.googleapis.com", 80))
#s.send(b"GET " + url + api_key)

#data = recv(s)


import urllib.request

api_key = open("YOUTUBE_DATA_API_KEY.txt", "r").read()

video_ID = "M5HAveREsJo"
url = "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id="+video_ID+"&key="

data = urllib.request.urlopen(url + api_key).read().decode("utf-8")

print(data)
