(function () {
	elms = document.querySelectorAll('[class="raw_images_list"] [class="raw_image_container raw_image_container "] [class="raw_list_image_inner"] a');
	urls = []
	for (i=0;i<elms.length;i++) {
		urls.push(elms[0].getAttribute("data-fancybox-href"));
	}
	return urls
})();