function get_raffles() {
	// function returns a list of raffles
	window.scrollTo(0, document.body.scrollHeight);
	
	// raffles list
	var RafflesList = document.getElementsByClassName('panel-raffle');
	Raffles = [];
	
	for (var i in RafflesList) {
		try {
			var panel = RafflesList[i];
	
			if (panel.getAttribute('style') != "opacity: .6;") {
				// enter raffle
				href = panel.firstElementChild.firstElementChild.firstElementChild.href;
				Raffles.push(href);
				}
		} catch (e) {}
	}
	return Raffles;
}
/*	
function main() {
	Raffles = get_raffles();
	for (raffle in Raffles) {
		try {
			window.open(Raffles[raffle]);
			enter = document.getElementById('raffle-enter');
			if (enter.getAttribute("data-loading-text") == "Entering...") {
				enter.click();
			}
		} catch (e) {
			console.log("failed to enter raffle '" +Raffles[raffle]+"'!");
		}
	}
}
main()
*/
//var script = document.createElement('script');
//script.id = 'enter-raffles script';
//script.src = 'bot.js'
//script.textContent = ''
//document.head.appendChild(script)

function main() {
	Raffles = get_raffles();
	var i = 0;
	window.location.replace(Raffles[i]);

	function loop() {
		setTimeout(function() {
			// run code
			enter = document.getElementById('raffle-enter');
			if (enter.getAttribute("data-loading-text") == "Entering...") {enter.click()}
			window.location.replace(Raffles[i]);
		
			i++
			if (i < Raffles.length) {loop()}
		}, 5000)
	loop()
	}
}
main()