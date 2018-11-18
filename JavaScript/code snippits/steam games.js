function get_games() {
	elms = document.querySelectorAll('div[id="games_list_rows"] [id^="game_"]')
	games_owned = [];

	for (i=0;i<elms.length;i++) {
		games_owned.push(elms[i].id);
	} return games_owned
}


function get_games_2() {
	for (i=0;i<b.length;i++) {
		if (a.indexOf(b[0]) > -1 == false) {
			console.log(document.querySelectorAll('[id="'+b[i]+'"] [class^="gameListRowItemName"]')[0].innerText)
		}
	}
}