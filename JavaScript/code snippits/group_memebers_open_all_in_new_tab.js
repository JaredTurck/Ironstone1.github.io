//groups
users = document.querySelectorAll('div[id="memberList"] [data-miniprofile][class] div[class^="playerAvatar"] a[href^="https://steamcommunity.com/"]');
for (i=0;i<users.length;i++) {
	window.open(users[i].href);
}


//friends list
users = document.querySelectorAll('div[id="search_results"] div[class^="selectable friend_block"][data-miniprofile] a[class="selectable_overlay"]');
for (i=0;i<users.length;i++) {
	window.open(users[i].href);
}