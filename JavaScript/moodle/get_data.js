function get_names() {
	var elms = document.querySelectorAll('select[name="stdnm"] option');
	//var names = []
	var names = ""

	for (i=1;i<elms.length;i++) {
		//names.push(elms[i].innerText);
		names += "\n" + (elms[i].innerText);
		
	}
	//return JSON.stringify(names)
	console.log(names);
}