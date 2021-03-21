(function(){
	friends = document.querySelectorAll('[id^="fr_"]')
	for (i=0;i<friends.length;i++) {
		last_online = friends[400].querySelectorAll('[class="friend_last_online_text"]')[0].innerText;
		url = friends[400].querySelectorAll('[class="selectable_overlay"]')[0].getAttribute("href");
	}
})();