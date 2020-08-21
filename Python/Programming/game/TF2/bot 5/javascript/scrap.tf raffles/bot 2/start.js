function scrollToEnd() {
	function loop() {
		setTimeout(function() {
			elem = document.getElementsByClassName("panel-body pag-done pag-loading")[0].innerHTML;
			if (elem != "That's all, no more!") {
				window.scrollTo(0, document.body.scrollHeight); loop();
			} else {window.scrollTo(0, 0)}
		}, 2000);
	} loop();
}

/*scrollToEnd()
var Raffles = get_raffles();

var count = 0
*function loop() {
	window.location = Raffles[count]
	
	setTimeout(function(){				// wait 4 seconds for page to load, then enter raffle
		var enter = document.getElementById("raffle-enter");
		if (enter.children[1].innerHTML == "Enter Raffle") {
				enter.click()}}, (8000*count)-4000);
	
	setTimeout(function(){
		if (count <= Raffles.length) {count++;loop()}}, 8000*count) // wait 4 seconds for raffle to enter
}*/


//Author : Ironstone1_
//version : 1.0
//Description : Simple scrap.tf raffles bot!
//copyright © Ironstone1_

var rafflesListWait = 2000;		//time to wait on page load, before check for raffles in miliseconds.
var enterRaffleWait = 4000;		//time to wait after raffle entered, in miliseconds.
var refrshlWaitTime = 60;		//time to wait before page is refresh in seconds.
var BotOn = true;


function get_raffles() {
	// generate raffles list
	var Raffles = [];
	
	var total = parseInt(document.getElementsByTagName("var")[0].innerHTML.split("/")[1]);
	for (var i = 0; i < total; i++) {
		try {
			var panel = document.getElementsByClassName("panel-raffle")[i];
			var href = panel.getElementsByClassName("raffle-name")[0].firstElementChild.href;
		
			if (panel.getAttribute("style") != "opacity: .6;") {
				if (panel.innerHTML.includes("Withdraw Items") === false) {
					Raffles.push(href);
				}
			}
		} catch (e) {}
	} return Raffles;
}

function main() {
	var url = window.location.href;
	if (url == "https://scrap.tf/raffles") {
		setTimeout(function(){
			if (get_raffles().length !== 0) {
				window.location.replace(get_raffles()[0]);}
		}, rafflesListWait);
		
	} else if (url.includes("scrap.tf/raffles/")) {
		setTimeout(function(){
			var enter = document.getElementById("raffle-enter");
			if (enter.children[1].innerHTML === "Enter Raffle") {
				enter.click();}}, 1000);
	
		setTimeout(function() {
			window.location.replace("https://scrap.tf/raffles")},enterRaffleWait);}
	
} if (BotOn === true) {
	setInterval(function() {main()}, 5000);main();
	setInterval(function() {location.reload()}, 1000*refrshlWaitTime);
}