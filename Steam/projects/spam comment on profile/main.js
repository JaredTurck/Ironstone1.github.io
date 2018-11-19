var script1 = document.createElement("script");
script1.innerHTML = `
function spam_comments() {
	var message = prompt("enter message: ")
	for (i=0;i<6;i++) {
		setTimeout(function(){
			document.querySelectorAll('div[class="commentthread_entry_quotebox"] [id^="commentthread_Profile_"]')[0].value = message;
			document.querySelectorAll('div[class="commentthread_entry_submitlink"] [id^="commentthread_Profile_"]')[0].click();
		}, i*3000);
	}
}
`
document.body.appendChild(script1);

var div1 = document.createElement("div");
div1.innerHTML = '<button onclick="javascript:spam_comments(message);" class="btn_profile_action btn_medium" >Post 6 comments!</button>';
document.querySelectorAll('[class="commentthread_header"]')[0].appendChild(div1);