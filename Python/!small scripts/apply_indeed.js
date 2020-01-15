function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}

setTimeout(function(){next_job()}, 2000);
var elms = contains('span', 'Apply with your Indeed CV');
var count = 0;

function next_job() {
	try {
		if (count < elms.length) {
			count += 1;
			elms[count].click();
			setTimeout(function(){contains("span", "Apply with Indeed")[0].click()},200);
			
		} else if (count >= elms.length){
			contains('span', 'Next')[0].click();
		}
	} catch (error) {
		next_job();
	}
}



// ---


next_job_bttn = document.createElement("div");
next_job_bttn.innerHTML = '<button id="nextJobButton" onclick="next_job();">Next Job!</button>'
document.querySelectorAll('tr[role="search"]')[0].appendChild(next_job_bttn);



setInterval(function() {
	if (contains("h1", "Your application has been submitted.")[0] != undefined) {
		
	}
},500);



document.querySelectorAll('div[class="ia-CombinedResumeError"] a[href="#"]')[0].click();
document.getElementById('ia-FilePicker-resume');