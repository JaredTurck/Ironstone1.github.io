(function() {
	var items = document.querySelectorAll('a[class="tab_item_overlay"]');
	text = ""
	
	for (i=0;i<items.length;i++) {
		text += "\n" + items[i].href;
	} console.log(text)
})();