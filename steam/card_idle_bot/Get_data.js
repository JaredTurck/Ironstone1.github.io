(function() {
	var container = document.getElementsByClassName("badges_sheet")[0].getElementsByClassName("badge_row is_link");
	var games_list = [];

	for (i=0;i<container.length;i++) {
		try {
			var drops = container[i].getElementsByClassName("progress_info_bold")[0].innerText.replace(/\t/g, "");
		
			if (/\d/.test(drops) == true) {
				No_drops = parseInt(drops.split(" ")[0]);
				Name = container[i].getElementsByClassName("badge_title")[0].innerText.replace(/\t/g, "").slice(0, -1);
				games_list.push(Name);
			}
		} catch(error) {}
	} return games_list;
})()


(function() {
	var action_container = document.getElementById("global_actions");
	return action_container.getElementsByClassName("user_avatar playerAvatar online")[0].href
})()