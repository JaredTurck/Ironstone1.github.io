// Author : Ironstone1_
// Name : scrap.tf raffle bot
// Description : automaticly enter scrap.tf raffles
// version 2.2

// The bot can be manually enabled by typing: 
// localStorage.getItem("botStatus", "true")
// into the webbrowser javascript console.

function scrollToEnd() {
	function loop() {
		setTimeout(function() {
			elem = document.getElementsByClassName("panel-body pag-done pag-loading")[0].innerHTML;
			if (elem != "That's all, no more!") {
				window.scrollTo(0, document.body.scrollHeight); loop();
			} else if (elem == "Error loading more raffles."){
				window.location.replace("https://scrap.tf/raffles");
			} else {window.scrollTo(0, 0)}
		}, 2000);
	} loop();
}

function get_raffles(s) {
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
	if (window.location.href == "https://scrap.tf/raffles") {
		scrollToEnd();
		setTimeout(function(){
			localStorage.setItem("raffles", JSON.stringify(get_raffles())); // add raffles list to localStorage
			localStorage.setItem("count", 0); // set counter
			var Raffles = JSON.parse(localStorage.getItem("raffles")); // get raffles list from localStorage
			if (Raffles.length !== 0) {window.location.replace(Raffles[0])}},8000);  // goto first raffle
	}
	if (window.location.href.includes("https://scrap.tf/raffles/") && window.location.href.length == 31) {
		var Raffles = JSON.parse(localStorage.getItem("raffles")); // get raffles list from localStorage
		try {var enter = document.getElementById("raffle-enter"); // get enter raffle button
		if (enter.getElementsByTagName("i18n")[0].innerHTML == "Enter Raffle") {enter.click()}} catch (e) {}
		
		setTimeout(function() {
			localStorage.setItem("count", parseInt(localStorage.getItem("count")) +1); // add 1 to counter
			if (Raffles[localStorage.getItem("count")] === undefined) {
				localStorage.setItem("botStatus", "off"); // turn off bot
				window.location.replace("https://scrap.tf/raffles"); // goto raffles page
			} else {window.location.replace(Raffles[localStorage.getItem("count")])}}, 3000); // goto next raffle
	}
} if (localStorage.getItem("botStatus") === "on") {main()}

if (window.location.href == "https://scrap.tf/raffles"){try {
	a = document.createElement("a");a.className = "btn btn-inverse btn-embossed"; // create enter all raffles button
	a.href = 'javascript:localStorage.setItem("botStatus", "on");window.location.href="https://scrap.tf/raffles";';
	a.text = "Enter All Raffles!"; a.id = "enter-all-raffles";
	document.getElementsByClassName("new-raffle")[0].parentNode.appendChild(a)} catch (e) {}} // inject button into DOM

if (window.location.href === "https://scrap.tf/raffles/?bot=auto") {
	setTimeout(function(){document.getElementById("enter-all-raffles").click()}, 2000);
}