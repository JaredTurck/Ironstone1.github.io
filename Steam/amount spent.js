function run() {
	elms = document.querySelectorAll('td[class="wht_total "]')
	total = 0

	for (i = 0;i<elms.length;i++) {
		current = parseFloat(elms[i].innerText.replace("£", ""));
		total += current;
	}
	return total;
}

//https://store.steampowered.com/account/history/
//£2243.18 spent total