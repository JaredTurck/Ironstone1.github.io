function get_user_data() {
	var tagsList = [
			"steamID64",
			"privacyState",
			"vacBanned",
			"tradeBanState",
			"isLimitedAccount",
			"memberSince"
		]

	var fetchedHTMLElement;
	var req1 = new XMLHttpRequest();
	var div1 = document.createElement("div");
	div1.id = "div_fetchedHTMLElement"

	req1.onreadystatechange = function() {
		if (req1.readyState == XMLHttpRequest.DONE) {
			fetchedHTMLElement = document.createElement("div");
			fetchedHTMLElement.id = "fetchedHTMLElement";
			fetchedHTMLElement.innerHTML = req1.responseText;
			console.log("HTML fetched!");
		
			for (i=0;i<tagsList.length;i++) {
				p1 = document.createElement("p");
				p1.innerHTML = tagsList[i] + ": " + fetchedHTMLElement.getElementsByTagName(tagsList[i])[0].innerHTML;
				p1.className = "profile_summary";
				p1.style.color = "#898989";
				div1.appendChild(p1);
			}
		}
	}
	req1.open("GET", document.location.href + "?xml=1");
	req1.send(null);

	document.getElementsByClassName("profile_in_game persona")[0].appendChild(div1);
	document.getElementsByClassName("actual_persona_name")[0].onclick = 'show_user_data()';
	document.getElementById("div_fetchedHTMLElement").style.display = "none";
}