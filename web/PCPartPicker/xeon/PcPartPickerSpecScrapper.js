// ==UserScript==
// @name         Specs Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A JS bot that collects processor specs from the manufacter page.
// @author       Ironstone1
// @match        http://*/*
// @grant        none
// ==/UserScript==

//@Ironstone1 2017 - All rights reserved.

(function() {
    'use strict';
    // Your code here...
    var url = prompt("Copy and paste the URL from Intel/AMD manufacter page:");
    window.location.href = url;

    var specs = {};
    var specsIndex = [
          "MANUFACTURER",
          "PART",
          "DATA_WIDTH",
          "SOCKET",
          "OPERATING_FREQUENCY",
          "MAX_TURBO_FREQUENCY",
          "CORES",
          "CACHE",
          "LITHOGRAPHY",
          "THERMAL_DESIGN_POWER",
          "INCLUDES_CPU_COOLER",
          "SIMULTANEOUS_MULTITHREADING",
          "MAXIMUM_SUPPORTED_MEMORY",
          "INTEGRATED_GRAPHICS",
        ];


    if (document.location.href.include("https://ark.intel.com/products/")) {
        specs.MANUFACTURER = "Intel"; //MANUFACTURER
        specs.PART = "???";
        specs.DATA_WIDTH = $(".InstructionSet .value span")[0].innerHTML; //DATA WIDTH
        specs.SOCKET = $(".SocketsSupported .value span")[0].innerText.replace("FC",""); //SOCKET
        specs.OPERATING_FREQUENCY = $(".ClockSpeed .value span")[0].innerText; //OPERATING FREQUENCY
        specs.MAX_TURBO_FREQUENCY = $(".ClockSpeedMax .value span")[0].innerText; //MAX TURBO FREQUENCY
        specs.CORES = $(".CoreCount .value span")[0].innerText; //CORES
        specs.CACHE = $(".Cache .value span")[0].innerText.replace(" SmartCache",""); //CACHE
        specs.LITHOGRAPHY = $(".Lithography .value span")[0].innerText; //LITHOGRAPHY
        specs.THERMAL_DESIGN_POWER = $(".MaxTDP .value span")[0].innerText; //THERMAL DESIGN POWER
        specs.INCLUDES_CPU_COOLER = "???";
        specs.SIMULTANEOUS_MULTITHREADING = $(".HyperThreading .value span")[0].innerText.replace("Yes", "Yes: Hyper-Threading"); //SIMULTANEOUS MULTITHREADING
        specs.MAXIMUM_SUPPORTED_MEMORY = $(".MaxMem .value span")[0].innerText; //MAXIMUM SUPPORTED MEMORY
        specs.INTEGRATED_GRAPHICS = $(".GraphicsModel .value span")[0].innerText; //INTEGRATED GRAPHICS

    } else if (document.location.href.include("https://www.intel.com/content/")) {
        var ittr = ['L', 'L', 'An instruction', 'The socket', 'Processor Base Frequency', 'Max turbo frequency','Cores', 'CPU Cache', 'Lithography', 'Thermal Design Power', '???', 'Intel® Hyper-Threading', 'Max memory size', 'Processor Graphics'];
        for (var i=0;i<ittr.length;i++) {
            var value = $("a[data-content^='"+ittr[i]+"']")[0].parentElement.parentElement.children[1].innerText;
            eval("specs." + specsIndex[i] + " = '" + value + "'");
        }

    } else if (document.location.href.include("https://www.amd.com/en/products/")) {
        specs.MANUFACTURER = "AMD";
        // Still need to work on AMD version....


    } else {
        alert("Not a valid Input!");
    }

    //Output Is displayed....
    for (I in specs) {
        console.log(specs[I]);
    }

})();