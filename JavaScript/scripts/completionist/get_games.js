function get_games() {
	games = [];
	elms = document.querySelectorAll('div[class="game game-thumb status-played has-achievements"]');
	for (var i=0;i<elms.length;i++) {
		games.push(elms[i].title);
	} return games;
}