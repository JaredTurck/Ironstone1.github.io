function click_me() {
	var job_list = document.querySelectorAll('div[data-tn-component="organicJob"] h2[id][class] a[href]');

	for (var i=0;i<job_list.length;i++) {
		open(job_list[i].href);
	}
}