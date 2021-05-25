from pytube import YouTube


def get_input():
    user = input("Enter YouTube URL: ")
    while not True in ["https://youtu.be/" in user, "https://www.youtube.com/watch?v=" in user]:
        user = input("Invalid URL!\n> ")
    return user

if input("press enter to download at highest resolution, else type 'low' for low res!") == "low":
    download_path = YouTube(get_input()).streams.get_lowest_resolution().download()
else:
    download_path = YouTube(get_input()).streams.get_highest_resolution().download()

# download 1 video
# download playlist
