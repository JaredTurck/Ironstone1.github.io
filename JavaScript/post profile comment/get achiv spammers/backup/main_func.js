(function() {
	friends = []

	emoticons = document.querySelectorAll('div[id^="commentthread_Profile_"] img[src^="https://steamcommunity-a.akamaihd.net/economy/emoticon/"]');
	for (i=0;i<emoticons.length;i++) {
		current = emoticons[i].parentElement.parentElement.parentElement.querySelector('[class^="commentthread_comment_avatar"] a[href^="https://steamcommunity.com"]').href
		if (friends.includes(current) == false ) {
			friends.push(current);
		}
	}
	return friends;
})();