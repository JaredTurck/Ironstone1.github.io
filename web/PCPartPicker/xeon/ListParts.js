output = ""
for (i=0;i<$(".tdname a").length;i++) {
	output += "\n" + $(".tdname a")[i].href
} console.log(output)