(function () {
	var urls = document.querySelectorAll('[class="GrowthUnauthPinImage__Image"]');
	var url_array = [];
	for (i=0;i<urls.length;i++) {
		url_array.push(urls[i].getAttribute("src"));
	}
	return url_array;
})();

