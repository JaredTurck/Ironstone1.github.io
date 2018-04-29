
(function() {
	var inbox = []
	elms = document.querySelectorAll('div[class="friendslist_group_friends"]')[0].children;
	for (i=0;i<elms.length;i++) {
		if (elms[i].getElementsByClassName("unread_message_count_value")[0].innerHTML !== "") {
			var name = elms[3].querySelectorAll('span[class="linkFriend"]')[0].innerText;
			inbox.push(name);
		}
	} return inbox;
})()

//if (parseInt(elms[3].getElementsByClassName("unread_message_count_value")[0].innerHTML) != NaN)
	
//elms[3].click();

(function() {
	var elms = document.querySelectorAll('div[class="friendslist_group_friends"]')[0].children
	for (i=0;i<elms.length;i++) {
		if (elms[i].innerText.indexOf('vuzimanzi') > -1 == true) {
			elms[i].click();
		}
	}
})