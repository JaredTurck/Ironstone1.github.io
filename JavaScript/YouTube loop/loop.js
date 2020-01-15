//document.querySelectorAll('[aria-label="Play (k)"]')[0].click();

//document.querySelectorAll('[class="ytp-play-button ytp-button"][title="Replay"]')[0]



var script1 = document.createElement("script");
script1.innerHTML = `
function loop() {
	setInterval(function(){
		if (document.querySelectorAll('[class="ytp-play-button ytp-button"][title="Replay"]')[0] != undefined) {
			document.querySelectorAll('[class="ytp-play-button ytp-button"][title="Replay"]')[0].click()
		}
	}, 100)
}
`

document.getElementById("info").appendChild(script1);