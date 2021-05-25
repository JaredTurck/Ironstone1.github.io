function yt_get_videos() {
	a = document.querySelectorAll('[id="video-title"]');
	videos = [];
	for (i=0;i<a.length;i++) {
		current = a[i].getAttribute('href');
		if (current != null) {
			videos.push(current);
		}
	}
	return videos;
}