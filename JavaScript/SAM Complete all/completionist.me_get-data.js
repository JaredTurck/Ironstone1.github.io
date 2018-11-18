https://completionist.me/steam/profile/76561198184802503/apps?display=grid&order=desc&sort=last-unlock&search=&type=game&feature=achievements

//class="game game-thumb status-completed has-achievements"

(function() {
	AppIDs = [];
	div = document.querySelectorAll('div[class="explorer-grid games-grid"] div[class="game game-thumb status-completed has-achievements"] a[href^="https://completionist.me/"]');
	for (i=0;i<div.length;i++) {
		ID = div[i].href.split("/app/")[1].split("/achievements")[0];
		if (AppIDs.indexOf(ID) > -1 == false) {
			AppIDs.push(ID);
		}
	} 
	console.log(AppIDs.join("\n"));
})();