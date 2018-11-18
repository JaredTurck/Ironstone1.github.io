//init
//localStorage.setItem("BotNumber", "0")

if (document.location.href.indexOf("https://store.steampowered.com/join/completesignup") > -1) {
	localStorage.setItem("BotNumber", JSON.stringify(JSON.parse(localStorage.getItem("BotNumber")) + 1));
	document.getElementById("accountname").value = "420d972351_bot_" + localStorage.getItem("BotNumber");
	document.getElementById("password").value = "Steambot1234";
	document.getElementById("reenter_password").value = "Steambot1234";
	document.getElementById("createAccountButton").click();
}

if (document.location.href.indexOf("https://store.steampowered.com/join") > -1) {
	document.getElementById("email").value = "420d97235124da5b@gmail.com";
	document.getElementById("reenter_email").value = "420d97235124da5b@gmail.com";
	document.getElementById("i_agree_check").checked = true;

	//setInterval(function() {
	if (document.getElementById("captcha_text").value.length == 6) {
		document.getElementById("createAccountButton").click();
	}
	//}, 1000);
}


if (document.location.href.indexOf("https://store.steampowered.com/?created_account") > -1) {
	Logout();
}