function run_code() {
	list = document.querySelectorAll('[class="fname"] a[href]');

	for (i=0;i<list.length;i++) {
		current = list[i].getAttribute("href").split("/").slice(-1)[0];
		open("https://steamcommunity.com/profiles/" + current);
	}
}