var output = ""
var elms = document.querySelectorAll('table[class="Coloured"] tr td font[style^="font-size:"]');
for (i=0;i<elms.length;i++) {
	output += elms[i].innerText + "\n";
} console.log(output);