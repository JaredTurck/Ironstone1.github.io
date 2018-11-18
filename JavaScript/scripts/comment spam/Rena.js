// ==UserScript==
// @name         Rena - comment section
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://steamcommunity.com/sharedfiles/filedetails/?id=1427871530
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    (function() {
		function post_comment(n) {
            setTimeout(function(){
                document.querySelectorAll('textarea[class="commentthread_textarea"][placeholder="Add a comment"]')[0].value = ran_message();
                document.querySelectorAll('[id^="commentthread_Published"][class="btn_green_white_innerfade btn_small"]')[0].click();
            }, n*1000);
        }

		function ran_range(a, b) {
			return parseInt((Math.random()*100) % b + a)
		}

		function ran_message() {
			var src = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
			var message = ""
			for (var ii=0;ii<ran_range(1,100);ii++) {
				message += src[ran_range(0,src.length)]
			} return message;
		}

		setTimeout(function(){
			for (var i=0;i<10;i++) {
				post_comment(i+1)
			}
            setTimeout(function(){
                location.reload();
            },ran_range(0, 11)*1000)
		}, ran_range(0,60)*1000);
    })();
})();