//initialize
var all_pages_loaded = false;

function check4VAC() {
	var matchs = document.querySelectorAll('div[id="personaldata_elements_container"] tbody tr td table[class="csgo_scoreboard_inner_right"]');
	for (i=0;i<matchs.length;i++) {
		players = matchs[i].querySelectorAll('[class="inner_name"] [class^="playerAvatar"]');
		for (ii=0;ii<players.length;ii++) {
			// check player for VAC
			player_url = players[ii].querySelector('a[href^="https://steamcommunity.com/"]').href;
			getHTTPRequest(player_url, players[ii]);
		}
	}
	// improve --- add timeout to xmlhttprequest, 50 milliseconds between requests.
}

function getHTTPRequest(url, player_element) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			// display VAC next to usersname.
			VAC_status = request.responseText.split("<vacBanned>")[1].split("</vacBanned>")[0];
			if (VAC_status == 1) {
				player_element.parentElement.style.backgroundColor = "#ff0000"
			} else if (VAC_status == 0) {
				player_element.parentElement.querySelector('a[class="linkTitle"]').innerHTML += '<span style="color: #00ff0c;float: right;">✔</span>'
			}
		}
	}
	request.open("GET", url + "?xml=1", true);
	request.send(null);
	// improve --- ban since playing with you.
}

function loadAllPages() {
	load_more_button = document.getElementById("load_more_button");
	load_more_button.click();
	IntID = setInterval(function(){
		if (load_more_button.style.display == "none" && document.getElementById("inventory_history_loading").style.display == "none") {
			clearInterval(IntID);
			all_pages_loaded = true;
		} else {
			load_more_button.click();
		}
	}, 500);
	// improve --- load next page when current one has finished loading.
}

function check_all_start() {
	loadAllPages();
	all_pages_loaded_IntID = setInterval(function(){
		if (all_pages_loaded == true) {
			check4VAC();
			clearInterval(all_pages_loaded_IntID);
		}
	}, 100);
}