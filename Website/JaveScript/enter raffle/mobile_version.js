// ==UserScript==
// @name         Scrap.tf Raffles Bot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds an 'Enter All Raffles' button!
// @author       Ironstone1
// @match        https://scrap.tf/raffles
// @include      https://scrap.tf/raffles/*
// @grant        none
// ==/UserScript==

function GetRaffles() {
    var raffles = [];
	var panel = document.getElementsByClassName("panel-raffle");
	for (i=0;i<panel.length;i++) {
		if (panel[i].style.opacity != "0.6") {
			raffles.push(panel[i].getElementsByClassName("raffle-name")[0].children[0].href);
		}
	}
	if (raffles.length == 0) {return ["https://scrap.tf/raffles/undefined"];}
    sessionStorage.setItem("raffles", JSON.stringify(raffles));
    sessionStorage.setItem("raffles_count", 0);
	return raffles;
}

if (document.location.href == "https://scrap.tf/raffles") {
	document.location.href = GetRaffles()[0];
} setTimeout(function() {
	document.location.href = "https://scrap.tf/raffles";
}, 1000*300);

var raffles = JSON.parse(sessionStorage.getItem("raffles"));
if (raffles.indexOf(document.location.href) > -1) {
	if (String(document.getElementById("raffle-enter").onclick).indexOf("ScrapTF.Raffles.EnterRaffle") > -1) {
		document.getElementById("raffle-enter").click();
	} else {
		var count = Number(sessionStorage.getItem("raffles_count"));
		sessionStorage.setItem("raffles_count", count+1);
		document.location.href = raffles[count];
	}
}