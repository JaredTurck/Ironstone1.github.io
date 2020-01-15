//var msg = "hello"
//var Profile_ID = 76561198184802503
//post_comment("<3", "76561198184802503")
//document.location.href.includes("https://steamcommunity.com/") && document.location.href.includes("friends")

//post comment to individual users
//post comment to all users
//post_2_all_friends(":bhheart:")


function post_comment(message, profile_ID) {
	elm = document.querySelector('[id="search_results"]');
	jQuery.post("//steamcommunity.com/comment/Profile/post/" + profile_ID + "/-1/", {comment : message, count : 6, sessionid : g_sessionID}, function(response) {
		current_elm = document.createElement("div");
		if (response.success == false) {
			current_elm.innerHTML = "<span>" + response.text + "</span>&#13;&#10;";
		} else if (response.success == true) {
			current_elm.innerHTML = "<span>successfuly posted comment on " + profile_ID + "</span>&#13;&#10;";
		}
		elm.insertBefore(current_elm, elm.firstChild)
	});
}

function post_2_all_friends(message) {
	friends = document.querySelectorAll('div[id^="fr_"][data-steamid]');
	for (i=0;i<friends.length;i++) {
		post_current(friends[i], i);
	};
}

function post_current(current_friend, current_friend_num) {
	setTimeout(function(){
		post_comment(current_friend.getAttribute("data-steamid"), message);
	}, 500*current_friend_num);
}