(function() {
	elms = document.querySelectorAll('span[class="style-scope ytd-thumbnail-overlay-time-status-renderer"]');

	times = []
	for (i=0;i<elms.length;i++) {
		try {
			time = elms[i].innerText.replace(/[ \n\r\t]/g, "").split(':')
			times.push(parseInt(time[0])*60 + time[1]);
		} catch {
			console.log("Failed on " + i + "!");
		}
	}

	console.log(Math.max(...times));
})();