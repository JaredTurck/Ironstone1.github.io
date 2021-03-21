function a() {
	var url_elms = document.querySelectorAll('[jsname="r5xl4"][class="islrc"] div[jsaction] img[src^="data:image/"]');
	elms = []
	for (i=0;i<url_elms.length;i++) {
		elms.push(urls[i].getAttribute("src"));
	} return elms;
} a();