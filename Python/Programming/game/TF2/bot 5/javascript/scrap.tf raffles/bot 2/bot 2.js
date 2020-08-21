// Author : Ironstone1_
// Name : scrap.tf raffle bot
// Description : automaticly enter scrap.tf raffles
// version 2

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
			localStorage.setItem("raffles", JSON.stringify(get_raffles())); // generate raffles list
			var Raffles = JSON.parse(localStorage.getItem("raffles"));
		
			if (Raffles.length !== 0) {
				localStorage.setItem("count", 0); // set counter
				window.location.replace(Raffles[0]); // goto first raffle
			}
			setInterval(function(){window.location.reload()}, 600000); // reload page every 10 minutes
		},8000);
	}
	if (window.location.href.includes("https://scrap.tf/raffles/") && window.location.href.length == 31) {
		var Raffles = JSON.parse(localStorage.getItem("raffles")); // get raffles
	
		var enter = document.getElementById("raffle-enter");
		if (document.body.innerHTML.includes("This raffle ended ") === true) {} // raffle ended
		else if (document.body.innerHTML.includes(" to enter this raffle!") === true) {} // not logged in
		else if (enter.getElementsByTagName("i18n")[0].innerHTML == "Enter Raffle") {
			enter.click();
		}
		setTimeout(function() {
			localStorage.setItem("count", parseInt(localStorage.getItem("count")) +1); // add 1 to counter
			if (Raffles[localStorage.getItem("count")] === undefined) {
				window.location.replace("https://scrap.tf/raffles"); // check if all raffles have been entered
			} else {
				window.location.replace(Raffles[localStorage.getItem("count")]); // goto next raffle
			}
		}, 2500);
	}
}

if (localStorage.getItem("botStatus") === undefined) {
	if (prompt("would you like to turn on scrap.tf raffles bot? yes/no") === "yes") {
		localStorage.setItem("botStatus", true); alert("The bot will now begin!");
	} else {
		localStorage.setItem("botStatus", false);
		alert("failed to start bot! please manually start bot!");
	}
} if (localStorage.getItem("botStatus") === "true") {main()}