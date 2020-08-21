// apply downvotes to page
if (document.location.href.includes("uk.pcpartpicker.com/user/philip/comments")) {
	console.log("On comments page!");
} else if (document.location.href.includes("uk.pcpartpicker.com/") == true) {
	var vote_buttons = document.querySelectorAll('[onclick^="cx_vote("]');

	window.scrollTo(0,document.body.scrollHeight);
		
	setTimeout(function(){
		for (var i=0;i<vote_buttons.length;i++) {
			var current = vote_buttons[i].getAttribute("onclick");
			if (current.includes(",-1)")) {
				eval(current.replace("return false", ""));
			}
		}
	}, 1000);
	location.reload();
}

// open each href in new tab
function open_next() {
	if (document.location.href.includes("uk.pcpartpicker.com/user/philip/comments")) {
		var hrefs = document.querySelectorAll('[class="group"] h3[class="group__title group__title--comment"] a[href]');
		var count = 0;

		for (i=0;i<hrefs.length;i++) {
			setTimeout(function(){
				open(hrefs[0].href);
			}, 1000*count);
			count++;
		}
	}
}