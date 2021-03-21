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

(function() {
    'use strict'; undefined

    // Your code here...
    function GetRaffles() {
        var raffles = $("div[id^='raffle-box-'][style=''] a[href^='/raffles/']").map(function() {return this.href;});
        if (raffles.length === 0) {return ["https://scrap.tf/raffles"];}
        localStorage.setItem("raffles", JSON.stringify(raffles.splice(0, raffles.length)));
        localStorage.setItem("raffles_count", 0);
        return JSON.parse(localStorage.getItem("raffles"));
    }
    setTimeout(function(){window.location.href = "https://scrap.tf/raffles";}, 1000*120);
    var raffles = JSON.parse(localStorage.getItem("raffles"));
    if (raffles.indexOf(document.location.href) > -1) {
	    try {
		    $("button[id='raffle-enter'][onclick^='ScrapTF.Raffles.EnterRaffle']")[0].click();
	    } catch(e) {
		    var count = parseInt(localStorage.getItem("raffles_count"));
		    localStorage.setItem("raffles_count", count+1);
		    document.location.href = raffles[count];
	    }
    }

    var button = document.createElement("div");
    button.addEventListener('click', function() {
        document.location.href = GetRaffles()[0];
    }, false);
    button.innerHTML = '<button type="button" id="enter-all" class="btn btn-inverse btn-embossed">Enter All Raffles</button>';
    $("div[class='panel panel-info']")[0].prepend(button);
    if (document.location.href.indexOf("undefined") > -1){document.location.href = "https://scrap.tf/raffles";}
	if (document.location.href == "https://scrap.tf/raffles/?bot=auto") {document.getElementById("enter-all").click();}
})();

window.onload = function() {}