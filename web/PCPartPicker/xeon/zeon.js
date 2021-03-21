if (document.location.href == "https://www.intel.com/content/www/us/en/products/processors/xeon/view-all.html") {
	CPUs = document.getElementsByClassName("card-item component")
	output = ""
	for (i=0;i<CPUs.length;i++) {
		url = CPUs[i].getElementsByClassName("content-media list-view")[0].href;
		output += ("\n" + url)
	}
} console.log(output)

document.getElementsByClassName("col-xs-6 col-md-3")[3].innerHTML.replace(/ /g,"").replace(/\n/g,"")		// part
document.getElementsByClassName("col-xs-6 col-md-3")[85].innerHTML.replace(/ /g,"").replace(/\n/g,"")		// data width
document.getElementsByClassName("col-xs-6 col-md-3")[55].innerHTML.replace(/ /g,"").replace(/\n/g,"")		// socket
document.getElementsByClassName("col-xs-6 col-md-3")[15].innerHTML.replace(/ /g,"").replace(/\n/g,"")		// base frequency
document.getElementsByClassName("col-xs-6 col-md-3")[17].innerHTML.replace(/ /g,"").replace(/\n/g,"")		// turbo frequency
document.getElementsByClassName("col-xs-6 col-md-3")[11].innerHTML.replace(/ /g,"").replace(/\n/g,"")		// # of cores



Number|manufacture website
:----|:----