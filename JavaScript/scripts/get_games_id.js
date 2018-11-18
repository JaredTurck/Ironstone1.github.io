function get_games() {
	var elms = document.querySelectorAll('div[id="games_list_rows"] div[id^="game_"]');
	var games = "";

	for (var i=0;i<elms.length;i++) {
		games += "\n" + elms[i].id.replace("game_","");
	} console.log("\n" + games);
}