if (document.location.href == "https://www.steamgifts.com/" || document.location.href.includes("https://www.steamgifts.com/giveaways/search?page=")) {
	var elms = document.querySelectorAll('div[class="giveaway__row-outer-wrap"][data-game-id] a[class="giveaway__heading__name"]');

	for (var i=0;i<elms.length;i++) {
		open(elms[i].href);
	}
	
	setTimeout(function(){
		var nav_buttons = document.querySelectorAll('[class="pagination__navigation"] [data-page-number]');
		nav_buttons[nav_buttons.length-1].click();
	}, 15000);
}

if (document.location.href.includes("https://www.steamgifts.com/giveaway/")) {
	try {
		document.querySelectorAll('div[data-do="entry_insert"]')[0].click();
	} catch (e) {
	} finally {
		setTimeout(function(){
			window.close()
		}, 2000);
	}
}