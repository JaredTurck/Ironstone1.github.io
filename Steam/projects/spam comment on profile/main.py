var message = `:FlyingTent::phoenixheart::phoenixheart::FlyingTent::FlyingTent::FlyingTent::phoenixheart::phoenixheart::FlyingTent:
:phoenixheart::wcblood::em_heart::phoenixheart::FlyingTent::phoenixheart::em_heart::wcblood::phoenixheart:
:phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart::SD2DStar::ns_green::SD2DStar::phoenixheart:
:phoenixheart::em_heart::soabang::ns_green::wcblood::ns_green::soabang::em_heart::phoenixheart:
:FlyingTent::phoenixheart::SD2DStar::em_heart::SD2DStar::em_heart::SD2DStar::phoenixheart::FlyingTent:
:FlyingTent::FlyingTent::phoenixheart::wcblood::ns_green::wcblood::phoenixheart::FlyingTent::FlyingTent:
:FlyingTent::FlyingTent::FlyingTent::phoenixheart::SD2DStar::phoenixheart::FlyingTent::FlyingTent::FlyingTent:
:FlyingTent::FlyingTent::FlyingTent::FlyingTent::phoenixheart::FlyingTent::FlyingTent::FlyingTent::FlyingTent:`

for (i=0;i<6;i++) {
	setTimeout(function(){
		document.querySelectorAll('div[class="commentthread_entry_quotebox"] [id^="commentthread_Profile_"]')[0].value = message;
		document.querySelectorAll('div[class="commentthread_entry_submitlink"] [id^="commentthread_Profile_"]')[0].click();
	}, i*3000);
}