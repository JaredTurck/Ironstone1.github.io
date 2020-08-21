raffles_list = document.getElementById("raffles-list").getElementsByClassName("panel-raffle");
List = []

for (i=0;i<raffles_list.length;i++) {
	if (raffles_list[i].style.opacity !== "0.6") {
		List.push(raffles_list[i].getElementsByClassName("raffle-name")[0].children[0].href);
	}
}

// ---

function GetRaffles() {
	raffles = $("div[id^='raffle-box-'][style=''] a[href^='/raffles/']").map(function() {return this.href;});
	localStorage.setItem("raffles", JSON.stringify(raffles.splice(0, raffles.length)));
	localStorage.setItem("raffles_count", 0);
	return JSON.parse(localStorage.getItem("raffles"));
}

raffles = JSON.parse(localStorage.getItem("raffles"));
if (raffles.indexOf(document.location.href) > -1) {
	try {
		$("button[id='raffle-enter'][onclick^='ScrapTF.Raffles.EnterRaffle']")[0].click();
	} catch(e) {
		var count = parseInt(localStorage.getItem("raffles_count"));
		localStorage.setItem("raffles_count", count+1);
		document.location.href = raffles[count];
	}
}

div = document.createElement("div");
div.innerHTML = '<button type="button" class="btn btn-inverse btn-embossed" onclick="javascript:document.location.href = GetRaffles()[0];">Enter All</button>';
$("div[class='panel panel-info']")[0].prepend(div);