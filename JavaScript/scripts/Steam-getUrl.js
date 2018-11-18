//INIT
//https://store.steampowered.com/search/?sort_by=Released_DESC&tags=-1&category1=998&category2=22&genre=Free%20to%20Play&page=0
if (document.location.href == "https://store.steampowered.com/search/?sort_by=Released_DESC&tags=-1&category1=998&category2=22&genre=Free%20to%20Play&page=0") {
	localStorage.setItem("items", JSON.stringify([]));
	localStorage.setItem("count", 0);
}

//Main
function get_url() {
	var items = document.querySelectorAll('div[id="search_result_container"] a[href^="https://store.steampowered.com/app"]');
	for (var i=0;i<items.length;i++) {
		localStorage.setItem("items", JSON.stringify(JSON.parse(localStorage.getItem("items")).concat(items[i].href)));
	}
}

try {
	get_url();
	document.location.href = document.querySelectorAll('div[class="search_pagination_right"] a[class="pagebtn"]:last-child')[0].href;
} catch (Error) {
	
	if (document.querySelectorAll('div[class="game_area_already_owned page_content"]')[0] == undefined) {
		if (document.querySelectorAll('div[class="btn_addtocart"] a[href^="javascript:ShowGotSteamModal"]')[0] == undefined) {
			localStorage.setItem("count", JSON.stringify(JSON.parse(localStorage.getItem("count")) +1));
			document.location.href = JSON.parse(localStorage.getItem("items"))[JSON.parse(localStorage.getItem("count"))];
		} else {
			
			// click 'Play Game' button
			document.querySelectorAll('div[class="btn_addtocart"] a[href^="javascript:ShowGotSteamModal"]')[0].click();
			setTimeout(function(){
				document.querySelectorAll('div[class="got_steam_box"] a[class="gotSteam_SteamURL btn_blue leftbtn"]')[0].click();
			}, 1000);
			
			localStorage.setItem("count", JSON.stringify(JSON.parse(localStorage.getItem("count")) +1));
			setTimeout(function() {
				document.location.href = JSON.parse(localStorage.getItem("items"))[JSON.parse(localStorage.getItem("count"))];
			}, 10000);
		}
	} else {
		localStorage.setItem("count", JSON.stringify(JSON.parse(localStorage.getItem("count")) +1));
		document.location.href = JSON.parse(localStorage.getItem("items"))[JSON.parse(localStorage.getItem("count"))];
	}
	
	//goto next page
	//localStorage.setItem("count", JSON.stringify(JSON.parse(localStorage.getItem("count")) +1));
	//document.location.href = JSON.parse(localStorage.getItem("items"))[JSON.parse(localStorage.getItem("count"))];
}