function get_url_2() {
	var elms = document.querySelectorAll('div[id="search_result_container"] a[href^="https://store.steampowered.com/app/"]');
	for (var i=0;i<elms.length;i++) {
		if (elms[0].querySelectorAll('div[class="ds_flag ds_owned_flag"]')[0] == undefined) {
			localStorage.setItem("items", JSON.stringify(JSON.parse(localStorage.getItem("items")).concat(elms[0].href)));
		}
	}
}


//a.querySelectorAll('div[class="ds_flag ds_owned_flag"]')[0] == undefined
//div[class="ds_flag ds_owned_flag"]