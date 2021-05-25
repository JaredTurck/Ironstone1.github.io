function get_data() {
	elms = document.querySelectorAll('body tbody tr[data-block][title]');
	data = [];
	for (i=0;i<elms.length;i++) {
		HTML_id = elms[i].querySelectorAll('td[class="named"] code')[0].innerText;
		HTML_cr = elms[i].querySelectorAll('td[class="character"]')[0].innerText;
		data.push(HTML_id + "," + HTML_cr);
	}
	
	console.log(data.join('\n'));
}