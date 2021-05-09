(function() {
	elms = document.querySelectorAll('[class^="membersWrap"] [class^="member"] [class^="avatar-"]');
	users = [];
	for (i=0;i<elms.length;i++) {
		try {
			current_id = elms[i].querySelectorAll('[class^="avatar-"]')[0].getAttribute('src').split('avatars/')[1].split('/')[0];
			users.push(current_id);
			console.log("Got User ID!");
		} catch {
			console.log("Failed to get user ID!");
		}
	}
	return users;
})();