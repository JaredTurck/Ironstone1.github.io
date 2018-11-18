(function() {
	function post_comment(n) {
		setTimeout(function(){
			document.querySelectorAll('textarea[class="commentthread_textarea"][placeholder="Add a comment"]')[0].value = "Just another comment!"
			document.querySelectorAll('[id^="commentthread_Published"][class="btn_green_white_innerfade btn_small"]')[0].click();
		}, n*1000);
	}

	for (i=0;i<10;i++) {
		post_comment(i+1)
	}
})();