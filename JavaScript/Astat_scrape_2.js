//$('table[class="Coloured"] tbody')[0].children[2].children[0].innerText

Data = "";
var elm = $('table[class="Coloured"] tbody')[0].children;
for (i=0;i<elm.length;i++) {
	div = elm[i].children;
	for (ii=0;ii<div.length;ii++) {
		part = div[ii].innerText.replace(/\n/g, ",");
		Data += part.substring(1, part.length-1) + "\n";
	}
} console.log(Data);