setTimeout(function(){
	if (document.location.href.indexOf("https://store.steampowered.com/join/completesignup?creationid=") >= 0) {
		document.getElementById("accountname").value = String("Jared_" + Math.random()).replace(".","_");
		CheckAccountNameAvailability();
		
		document.getElementById("password").value = "Newgarden28_1";
		document.getElementById("reenter_password").value = "Newgarden28_1";
		CheckPasswordStrength()
		
		setTimeout(function(){
			document.getElementById("createAccountButton").click();
		}, 1500);
	}
	
	if (document.location.href.indexOf("https://store.steampowered.com/join") >= 0) {
		document.getElementById("email").value = "jaredturck9@gmail.com"
		document.getElementById("reenter_email").value = "jaredturck9@gmail.com"
		document.getElementById("i_agree_check").checked = true
		RefreshCaptcha()
		
		var IntID = setInterval(function(){
			if (document.getElementById("captcha_text").value.length == 6) {
				document.getElementById("createAccountButton").click();
			
				setTimeout(function(){
					open("https://mail.google.com/mail/")
				}, 1000);
				clearInterval(IntID);
			}
		}, 500);
	}
	
	if (document.location.href.lastIndexOf("https://store.steampowered.com/?created_account") >= 0) {
		prompt(String(document.getElementById("account_pulldown").innerText));
	}
	
	if (document.location.href.indexOf("https://mail.google.com/mail/") >= 0) {
		setTimeout(function(){
			document.querySelectorAll('table[id=":2d"] tbody tr')[0].click();
		}, 200);

		setTimeout(function(){
			open(document.querySelectorAll('[href^="https://store.steampowered.com/account/newaccountverification?"]')[0].href);
		}, 1000);
	}
}, 1000);