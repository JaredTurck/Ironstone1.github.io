elms = document.querySelectorAll('[id^="chat-messages-"] [class^="container"]');

current_element = elms[49]
if (window.CustomEvent) {
    current_element.dispatchEvent(new CustomEvent('contextmenu'));
} else if (document.createEvent) {
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('contextmenu', true, false);
    current_element.dispatchEvent(ev);
} else { // Internet Explorer
    current_element.fireEvent('oncontextmenu');
}



setInterval(function() {
	(function () {
		try {
			document.querySelectorAll('[id^="chat-messages-"] [aria-label="More"]')[1].click();
			document.getElementById("message-actions-delete").click();
			setTimeout(function(){
				try {
					document.querySelectorAll('button[type="submit"][class^="button-"]')[1].click();
					console.log("messaged deleted!");
				} catch {
					console.log("Failed to delete message!");
				}
			},200);
		} catch {
			console.log("error throw for some other reason!");
		}
	})();
}, 1000);
