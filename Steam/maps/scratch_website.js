function getData() {
	name = document.querySelectorAll('h1[class="entry-title"]')[0].innerText;
	crosshair = document.querySelectorAll('[class="x-block-grid mbn two-up"] pre[class="x-code"] code')[0].innerText;
	formatted = '"' + name + '" : "' + crosshair + '"';
	alert(formatted);
}