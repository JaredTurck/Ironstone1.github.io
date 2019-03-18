elm = document.querySelectorAll('span[class="normal_price"]');
total = 0
for (i=0;i<elm.length;i++) {
	total += parseFloat(elm[0].innerText.replace(/£/g, ""))
}


23.900000000000002 + 37.59999999999999 + 51.300000000000004