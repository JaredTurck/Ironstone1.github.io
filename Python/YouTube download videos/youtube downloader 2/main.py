import youtube_dl

def get_input():
    user = input("Enter YouTube URL: ")
    while not True in ["https://youtu.be/" in user, "https://www.youtube.com/watch?v=" in user]:
        user = input("Invalid URL!\n> ")
    return user

def download():
    with youtube_dl.YoutubeDL({}) as d:
        d.download([get_input()])
