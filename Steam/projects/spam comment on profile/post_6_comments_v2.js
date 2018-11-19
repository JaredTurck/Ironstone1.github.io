// ==UserScript==
// @name         post 6 comments!
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://steamcommunity.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var script1 = document.createElement("script");
    script1.innerHTML = `
var message = \`:FlyingTent::phoenixheart::phoenixheart::FlyingTent::FlyingTent::FlyingTent::phoenixheart::phoenixheart::FlyingTent:
:phoenixheart::wcblood::em_heart::phoenixheart::FlyingTent::phoenixheart::em_heart::wcblood::phoenixheart:
:phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart:
:phoenixheart::em_heart::soabang::ns_green::wcblood::ns_green::soabang::em_heart::phoenixheart:
:FlyingTent::phoenixheart::SD2DStar::em_heart::SD2DStar::em_heart::SD2DStar::phoenixheart::FlyingTent:
:FlyingTent::FlyingTent::phoenixheart::wcblood::ns_green::wcblood::phoenixheart::FlyingTent::FlyingTent:
:FlyingTent::FlyingTent::FlyingTent::phoenixheart::SD2DStar::phoenixheart::FlyingTent::FlyingTent::FlyingTent:
:FlyingTent::FlyingTent::FlyingTent::FlyingTent::phoenixheart::FlyingTent::FlyingTent::FlyingTent::FlyingTent:\`

function spam_comments() {
	if (document.location.href.indexOf("https://steamcommunity.com/id/") >= 0 || document.location.href.indexOf("https://steamcommunity.com/profiles/") >= 0) {
		spam_comments_profile();

	} if (document.location.href.indexOf("https://steamcommunity.com/groups/") >= 0) {
		spam_comments_group();
	}
}

function spam_comments_profile() {
	for (i=0;i<6;i++) {
		setTimeout(function(){
			document.querySelectorAll('div[class="commentthread_entry_quotebox"] [id^="commentthread_Profile_"]')[0].value = message;
			document.querySelectorAll('div[class="commentthread_entry_submitlink"] [id^="commentthread_Profile_"]')[0].click();
		}, i*2000);
	}
}

function spam_comments_group() {
	for (i=0;i<6;i++) {
		setTimeout(function(){
			document.querySelectorAll('div[class="commentthread_entry_quotebox"] [id^="commentthread_Clan_"]')[0].value = message;
			document.querySelectorAll('div[class="commentthread_entry_submitlink"] [id^="commentthread_Clan_"]')[0].click();
		}, i*2000);
	}
}
`
    document.body.appendChild(script1);

    var div1 = document.createElement("div");
    div1.innerHTML = '<button onclick="javascript:spam_comments();" class="btn_profile_action btn_medium pagebtn" >Post 6 comments!</button>';
    document.querySelectorAll('[class="commentthread_header"]')[0].appendChild(div1);
})();