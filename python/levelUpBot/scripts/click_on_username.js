(function() {
	var elms = document.querySelectorAll('div[class="friendslist_group_friends"]')[0].children;
	for (i=0;i<elms.length;i++) {
		if (elms[i].innerText.indexOf('{USERNAME}') > -1 == true) {
			elms[i].click();
		}
	}
})()