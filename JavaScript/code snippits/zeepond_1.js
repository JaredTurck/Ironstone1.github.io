setTimeout(function() {
	if (document.location.href.indexOf("https://www.zeepond.com/?bot=start") >= 0) {
		localStorage.setItem("giveaway_list", "[]");
		localStorage.setItem("next", "0");
		localStorage.setItem("bot_status", "start")
	
		document.location.href = "https://www.zeepond.com/cb-profile/pluginclass/cbconnect?provider=steam";
	}
	
	if (document.location.href.indexOf("https://steamcommunity.com/openid/login?") >= 0) {
		setTimeout(function(){
			document.getElementById("imageLogin").click();
		}, 50);
	}
	
	if (localStorage.getItem("bot_status") == "start") {
		if (document.location.href.indexOf("https://www.zeepond.com/index.php") >= 0) {
			document.location.href = "https://www.zeepond.com/zeepond/giveaways/enter-a-competition";
		}

		if (document.location.href.indexOf("https://www.zeepond.com/zeepond/giveaways/enter-a-competition") >= -0) {
			if (document.location.href.length > "https://www.zeepond.com/zeepond/giveaways/enter-a-competition".length) {
			
				var url_parts = document.location.href.split("/");
				if (url_parts[url_parts.length-1] == "enter_competition" || document.querySelectorAll('[class="mycompetition"]')[0].innerText.indexOf("You have already entered today") >= 0) {
					var next = JSON.parse(localStorage.getItem("giveaway_list"))[parseInt(localStorage.getItem("next"))];
					localStorage.setItem("next", JSON.stringify(parseInt(localStorage.getItem("next")) + 1));
					document.location.href = next;
					
					if (next == undefined) {
						localStorage.setItem("bot_status", "stop");
						document.location.href = "https://www.zeepond.com/zeepond/giveaways/enter-a-competition";
					}
					
				} else {
					document.location.href = document.querySelectorAll('a[href^="/zeepond/giveaways/enter-a-competition/"]')[0].href;
				}
			
			} else {
				var elm = document.querySelectorAll('[id="g-mainbar"] div[class="bv-item second"] a[href^="/zeepond/giveaways/"]');
				for (var i in elm) {
					if (elm[i].href !== undefined) {
						localStorage.setItem("giveaway_list", JSON.stringify(JSON.parse(localStorage.getItem("giveaway_list")).concat(JSON.parse('["'+elm[i].href+'"]'))));
					}
				}
				document.location.href = JSON.parse(localStorage.getItem("giveaway_list"))[0];
			}
		}
	}
}, 50);