(function(){
	var comment = `:DINOFORESTSTAFF::bhheart::bhheart::DINOFORESTSTAFF::DINOFORESTSTAFF::DINOFORESTSTAFF::bhheart::bhheart::DINOFORESTSTAFF:
:bhheart::bobhair::bobhair::bhheart::DINOFORESTSTAFF::bhheart::bobhair::bobhair::bhheart:
:bhheart::bobhair::bobhair::bobhair::bhheart::bobhair::bobhair::bobhair::bhheart:
:bhheart::bobhair::bobhair::bobhair::bobhair::bobhair::bobhair::bobhair::bhheart:
:DINOFORESTSTAFF::bhheart::bobhair::bobhair::bobhair::bobhair::bobhair::bhheart::DINOFORESTSTAFF:
:DINOFORESTSTAFF::DINOFORESTSTAFF::bhheart::bobhair::bobhair::bobhair::bhheart::DINOFORESTSTAFF::DINOFORESTSTAFF:
:DINOFORESTSTAFF::DINOFORESTSTAFF::DINOFORESTSTAFF::bhheart::bobhair::bhheart::DINOFORESTSTAFF::DINOFORESTSTAFF::DINOFORESTSTAFF:
:DINOFORESTSTAFF::DINOFORESTSTAFF::DINOFORESTSTAFF::DINOFORESTSTAFF::bhheart::DINOFORESTSTAFF::DINOFORESTSTAFF:`;
	
	document.querySelectorAll('textarea[class="commentthread_textarea"]')[0].value = comment;
	setTimeout(function(){
		document.querySelectorAll('[class="btn_green_white_innerfade btn_small"]')[0].click();
	}, 50);
})();