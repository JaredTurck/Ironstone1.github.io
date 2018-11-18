(function() {
	var items = document.querySelectorAll('[class="giveaway__heading"] a[href^="/giveaway/"]');
	for (var i=0;i<items.length;i++) {
		setTimeout(function(){
			open(items[i].href);
		}, i*1000);
	}
})();