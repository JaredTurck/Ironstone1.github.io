
function reset_def() {
	//INIT
	localStorage.setItem("total_kills", 0);
	localStorage.setItem("item_index", 0);
}

if (document.location.href == "https://steamcommunity.com/id/JaredCat/inventory/") {
	ShowTagFilters();
	document.getElementById("tag_filter_730_2_Quality_strange").checked = true;
	
	setTimeout(function(){
		var current_page = document.querySelectorAll('[class="inventory_page"][style="display: block;"] [class="itemHolder"]:not([style]) a[href^="#"][class="inventory_item_link"]');
		var elms_list = []
		for (var i=0;i<current_page.length;i++) {
			elms_list.push(current_page[i].href);
		}
		localStorage.setItem("current_page", JSON.stringify(elms_list));
		localStorage.setItem("item_index", parseInt(localStorage.getItem("item_index")) +1);
		document.location.href = elms_list[0];
	}, 10000);
}

if (document.location.href.indexOf("https://steamcommunity.com/id/JaredCat/inventory/#730_2_") == 0) {
	var number_kills = parseInt(document.querySelectorAll('div[class="descriptor"][style="color: rgb(207, 106, 50);"]')[0].innerText.split("Kills: ")[1]);
	localStorage.setItem("total_kills", parseInt(localStorage.getItem("total_kills")) + number_kills);
	
	localStorage.setItem("item_index", parseInt(localStorage.getItem("item_index")) +1);
	document.location.href = JSON.parse(localStorage.getItem("current_page"))[parseInt(localStorage.getItem("item_index"))];
}