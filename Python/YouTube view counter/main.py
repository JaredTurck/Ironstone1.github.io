from youtube_api import YouTubeDataAPI

class YouTube():
    def __init__(self):
        self.api_key = "AIzaSyDlWqALrqu7ZHFaO-OKliElkFN5SRXdOdI"
        self.video_id = "LpMJ8X7IKKE"
        self.youtube = YouTubeDataAPI(self.api_key)
        self.get_stats()

    def get_stats(self):
        self.stats = dict(self.youtube.get_video_metadata(video_id=self.video_id))
        self.views = self.stats["video_view_count"]
        self.likes = self.stats["video_like_count"]
        self.dislikes = self.stats["video_dislike_count"]
        self.comments = self.stats["video_comment_count"]
        

bot = YouTube()



