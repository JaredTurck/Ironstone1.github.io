function post_comment() {
	var LoveHeart = ":FlyingTent::phoenixheart::phoenixheart::FlyingTent::FlyingTent::FlyingTent::phoenixheart::phoenixheart::FlyingTent:\n:phoenixheart::wcblood::em_heart::phoenixheart::FlyingTent::phoenixheart::em_heart::wcblood::phoenixheart:\n:phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart:\n:phoenixheart::em_heart::soabang::ns_green::wcblood::ns_green::soabang::em_heart::phoenixheart:\n:FlyingTent::phoenixheart::SD2DStar::em_heart::SD2DStar::em_heart::SD2DStar::phoenixheart::FlyingTent:\n:FlyingTent::FlyingTent::phoenixheart::wcblood::ns_green::wcblood::phoenixheart::FlyingTent::FlyingTent:\n:FlyingTent::FlyingTent::FlyingTent::phoenixheart::SD2DStar::phoenixheart::FlyingTent::FlyingTent::FlyingTent:\n:FlyingTent::FlyingTent::FlyingTent::FlyingTent::phoenixheart::FlyingTent::FlyingTent::FlyingTent::FlyingTent:";
	document.querySelectorAll('div[class="commentthread_entry_quotebox"] textarea[id^="commentthread_Profile_"]')[0].value = LoveHeart;
	document.querySelectorAll('span[class="btn_green_white_innerfade btn_small"][id^="commentthread_Profile_"]')[0].click();
}

function post_comment() {
	for (i=0;i<8;i++) {
		setTimeout(
			function(){
				var p1 = ":FlyingTent::phoenixheart::phoenixheart::FlyingTent::FlyingTent::FlyingTent::phoenixheart::phoenixheart::FlyingTent:";
				var p2 = ":phoenixheart::wcblood::em_heart::phoenixheart::FlyingTent::phoenixheart::em_heart::wcblood::phoenixheart:";
				var p3 = ":phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart:";
				var p4 = ":phoenixheart::em_heart::soabang::ns_green::wcblood::ns_green::soabang::em_heart::phoenixheart:";
				var p5 = ":FlyingTent::phoenixheart::SD2DStar::em_heart::SD2DStar::em_heart::SD2DStar::phoenixheart::FlyingTent:";
				var p6 = ":FlyingTent::FlyingTent::phoenixheart::wcblood::ns_green::wcblood::phoenixheart::FlyingTent::FlyingTent:";
				var p7 = ":FlyingTent::FlyingTent::FlyingTent::phoenixheart::SD2DStar::phoenixheart::FlyingTent::FlyingTent::FlyingTent:";
				var p8 = ":FlyingTent::FlyingTent::FlyingTent::FlyingTent::phoenixheart::FlyingTent::FlyingTent::FlyingTent::FlyingTent:";
				var LoveHeart = p1 +"\n"+ p2 +"\n"+ p3 +"\n"+ p4 +"\n"+ p5 +"\n"+ p6 +"\n"+ p7 +"\n"+ p8;
				document.querySelectorAll('div[class="commentthread_entry_quotebox"] textarea[id^="commentthread_Profile_"]')[0].value = LoveHeart;
				document.querySelectorAll('span[class="btn_green_white_innerfade btn_small"][id^="commentthread_Profile_"]')[0].click();
			}, 1000*i
		)
	}
}