
if (document.location.href === "https://scrap.tf/raffles") {
	for (i=0;i<20;i++) {
		if (document.getElementsByClassName("panel-body pag-done pag-loading")[0].innerHTML !== "That's all, no more!") {
			window.scrollTo(0,document.body.scrollHeight);
		}
	}
		
	var raffles = [];
	var Element = document.getElementById("raffles-list").getElementsByClassName("panel-raffle");
	for (i=0;i<Element.length;i++) {
		var url = Element[i].getElementsByClassName("raffle-name")[0].children[0].href;
		raffles.push(url);
	}
}

if (document.location.href.indexOf("https://scrap.tf/raffles/") != -1) {
	if (String(document.getElementById("raffle-enter").onclick).indexOf("ScrapTF.Raffles.EnterRaffle") != -1) {
		document.getElementById("raffle-enter").click();
	} else {
		window.close();
	}
}