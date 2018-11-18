(function() {
	url = "https://steamcommunity.com/id/Ironstone1/gamecards/";
	elms = document.querySelectorAll('[class="badge_row is_link"]');
	result = [];

	for (i=0;i<elms.length;i++) {
		if (elms[i].querySelectorAll('div[class="badge_title_playgame"]').length > 0) {
			result.push(parseInt(elms[i].querySelectorAll('[href^="'+url+'"]')[0].href.split("gamecards/")[1].replace("/","")));
		}
	} return result
})();