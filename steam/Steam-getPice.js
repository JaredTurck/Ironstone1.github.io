//INIT
if (document.location.href == "https://store.steampowered.com/search?page=0") {
	localStorage.setItem("priceArray", "[]");
	localStorage.setItem("pageNum", 0);
	localStorage.setItem("lastPage", parseInt(document.querySelectorAll("div[class='search_pagination'] a")[2].innerText));
}

//MAIN
(function () {
	var prices = [];
	var elms = document.querySelectorAll("a[href^='https://store.steampowered.com/app/'] div[class^='col search_price'] div[class^='col search_price']");
	for (var i=0;i<elms.length;i++) {
		if (elms[i].innerText.indexOf("£") > -1) {
			prices.push(parseFloat(elms[i].innerText.replace("£", "")));
		}
	}
	localStorage.setItem("priceArray", JSON.stringify(JSON.parse(localStorage.getItem("priceArray")).concat(prices)));
	localStorage.setItem("pageNum", parseInt(localStorage.getItem("pageNum")) + 1);
	
	if ( parseInt(localStorage.getItem("lastPage")) > parseInt(localStorage.getItem("pageNum"))) {
		document.location.href = "https://store.steampowered.com/search?page=" + localStorage.getItem("pageNum");
	} else {
		//OUTPUT
		var priceArray = JSON.parse(localStorage.getItem("priceArray"));
		var total = Math.round(priceArray.reduce(function(a,b){return a + b;}) * 100)/100;
		var average = Math.round((total / priceArray.length) * 100)/100;
		document.write("Total: £" + total + "<br>Average: £" + average + "<br>No. Games: " + priceArray.length);
	}
})();