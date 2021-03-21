// ==UserScript==
// @name         Amazon Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.co.uk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    if (location.href == "https://www.amazon.co.uk/?bot=start") {
        localStorage.setItem("output", "");
        localStorage.setItem("run", "true");
        var url = prompt("Enter Amazon URL:");
        location.href = url;
    } else {
        window.scrollTo(0, document.body.scrollHeight);
        if (localStorage.getItem("run") == "true") {
            var output = "";
            var results = document.getElementById("s-results-list-atf").children;
            for (var i=0;i<results.length;i++) {
                    var next = results[i].getElementsByClassName("a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal")[0].href;
                output += "\n" + next;
            }
            localStorage.setItem("output", localStorage.getItem("output") + output);
            document.getElementById("pagnNextString").click();
        }
    }
})();