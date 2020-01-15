// allows you to get webpage HTML without refresh
var xhttp = new XMLHttpRequest();
xhttp.open("GET", window.location.href, true);
xhttp.send();

xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		console.log(xhttp.responseText);
	}
}