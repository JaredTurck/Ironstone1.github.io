(function() {
	elms = document.querySelectorAll('[class="container-fluid"] li a[href^="/"]');
	urls = [];
	for (i=0;i<elms.length;i++) {
		setTimeout(function(){
			open("https://nnfs.io/" + elms[i].getAttribute('href').replace('/', ''));
		}, i*2000);
	}
	return urls;
})();