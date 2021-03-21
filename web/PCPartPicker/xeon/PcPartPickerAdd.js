// ==UserScript==
// @name         PcPartPicker List
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://uk.pcpartpicker.com/list/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    setTimeout(function() {
        var output = localStorage.getItem("output").split("\n");
        var i = localStorage.getItem("i");

        document.getElementById("add_custom").click();
        localStorage.setItem("i", parse_int(localStorage.getItem("i"))+1);
        var form = document.getElementById("upp_add_custom_form").children;

        if (output[i] === undefined) {
            throw new Error("end");
        } else {
            form[0].value = output[i];
            form[1].click();
        }

        var run = 0;
        while (run === 0) {
	        try {
                document.getElementById("add_custom_submit").click();
                run = 1;
            } catch(error) {}
        }
    }, 5000); // problem
})();