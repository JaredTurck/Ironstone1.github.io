if (document.location.href.indexOf("edit?bot=start") > -1) {
	var name = document.location.href.split(/name=/g)[1].split(/&/g)[0];
	var img = document.location.href.split(/img=/g)[1].split(/&/g)[0];
	
	document.getElementById("personaName").value = name.replace(/%20/g, " ") + 	"\u3000"
	document.querySelectorAll('button[type="submit"][class^="btn_green_white_innerfade"]')[0].click()
}