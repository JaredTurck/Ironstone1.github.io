function spam_comments() {
	for (i=0;i<6;i++) {
		setTimeout(function(){
			if (document.location.href.includes("steamcommunity.com/sharedfiles/filedetails/")) {
				document.querySelectorAll('div[class="commentthread_entry_quotebox"] textarea[class="commentthread_textarea"]')[0].value = message;
				document.querySelectorAll('[id^="commentthread_PublishedFile_Public_"][class^="btn_green_white_innerfade"]')[0].click();
			} else {
				document.querySelectorAll('div[class="commentthread_entry_quotebox"] [id^="commentthread_Profile_"]')[0].value = message;
				document.querySelectorAll('div[class="commentthread_entry_submitlink"] [id^="commentthread_Profile_"]')[0].click();
			}
		}, i*3000);
	}
}