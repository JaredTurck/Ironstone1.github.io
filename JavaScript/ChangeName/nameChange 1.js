document.location.href = "http://steamcommunity.com/id/Ironstone1/edit"
setTimeout(function(){
	document.getElementById("personaName").value = Math.random()
	document.getElementsByClassName("btn_green_white_innerfade btn_medium")[0].click()
}, 10000)

/*
function getName() {
	window.open("http://steamcommunity.com/id/" + parseInt(Math.random()*1000000000))
	try {
		document.getElementsByClassName("actual_persona_name")[0].innerHTML
	} catch (e) {
		getName();
	}
}*/