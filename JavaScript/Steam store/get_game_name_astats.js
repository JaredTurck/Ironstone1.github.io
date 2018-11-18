(function() {
	var items = document.querySelectorAll('table[class="Coloured"] tr td table tbody')
	text = ""
	
	for (i=0;i<items.length;i++) {
		text += "\n" + items[i].querySelectorAll('tr td font')[0].innerText.split(".")[0]
	} console.log(text)
})();