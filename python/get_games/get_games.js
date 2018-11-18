(function() {
	var elms = document.querySelectorAll('div[id^="game_"]');
	var games = "";
	for (var i=0;i<elms.length;i++) {
		games += "\n" + elms[i].id.replace(/game_/g, "");
	} console.log(games);
})()

(function() {var elms = document.querySelectorAll('div[id^="game_"]');var games = "";for (var i=0;i<elms.length;i++) {games += "\n" + elms[i].id.replace(/game_/g, "");} console.log(games);})();


(function() {
	var elms = document.querySelectorAll('div[id^="game_"]');
	var games = "";
	for (var i=0;i<elms.length;i++) {
		games += "\n" + elms[i].id.replace(/game_/g, "");
	} return games;
})();